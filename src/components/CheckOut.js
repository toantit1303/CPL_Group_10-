import React, { useState, useEffect, useRef } from "react";
import { Table, Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

const Checkout = () => {
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [purchase, setPurchase] = useState(0);
    const [cart, setCart] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const paymentHandledRef = useRef(false); // Sử dụng useRef để theo dõi trạng thái đã xử lý

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const verifiedUser = JSON.parse(localStorage.getItem('verifiedUser'));
        const cartProduct = JSON.parse(localStorage.getItem('cart'));
        const totalBill = JSON.parse(localStorage.getItem('finalPrice'));

        if (verifiedUser) {
            setFullName(verifiedUser.fullName || "");
            setAddress(verifiedUser.address || "");
            setMobile(verifiedUser.phone || "");
            setEmail(verifiedUser.email || "");
        }
        setCart(cartProduct || []);
        setPurchase(totalBill || 0);

        const queryParams = new URLSearchParams(location.search);
        const status = queryParams.get('status');

        if (status && !paymentHandledRef.current) {
            handlePaymentResult(status === '1');
            paymentHandledRef.current = true; // Đánh dấu đã xử lý
        }
    }, [location.search]);

    const redirectToPayment = async (e) => {
        e.preventDefault();

        const verifiedUser = JSON.parse(localStorage.getItem('verifiedUser'));
        const cart = JSON.parse(localStorage.getItem('cart'));

        if (!verifiedUser || !cart || !fullName || !address || !mobile || !email) {
            alert("Missing information");
            return;
        }

        try {
            const totalAmount = cart.reduce((sum, product) => {
                const price = parseFloat(product.Price.replace('$', ''));
                return sum + price * product.quantity;
            }, 0);
            const finalAmount = Math.ceil(totalAmount * 25300);

            const paymentResponse = await axios.post('http://localhost:8888/payment', {
                amount: finalAmount
            });

            const paymentData = paymentResponse.data;

            if (paymentData.order_url) {
                window.location.href = paymentData.order_url;
            } else {
                throw new Error("Failed to create payment");
            }

        } catch (error) {
            alert("Failed to Purchase");
            console.error(error);
        }
    };

    const handlePaymentResult = async (success) => {
        if (success) {
            try {
                const verifiedUser = JSON.parse(localStorage.getItem('verifiedUser'));
                const cart = JSON.parse(localStorage.getItem('cart'));

                if (!verifiedUser || !cart) {
                    throw new Error("Missing user or cart information");
                }

                const { fullName, address, phone, email } = verifiedUser;

                if (!fullName || !address || !phone || !email) {
                    throw new Error("Missing user information");
                }

                const totalAmount = cart.reduce((sum, product) => {
                    const price = parseFloat(product.Price.replace('$', ''));
                    return sum + price * product.quantity;
                }, 0);

                const order = {
                    id: new Date().getTime().toString(),
                    orderDate: new Date().toISOString(),
                    status: 1,
                    total: totalAmount,
                    userInfo: [{ uId: verifiedUser.id, fullName, address, mobile, email }],
                    orderDetail: cart.map(product => ({
                        Pid: product.id,
                        pName: product.Name,
                        Price: product.Price,
                        vat: "8%",
                        quantity: product.quantity,
                        discount: ""
                    }))
                };

                console.log('Order:', order);

                const response = await fetch('http://localhost:9999/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(order)
                });

                if (!response.ok) throw new Error("Failed to save the order");

                for (const product of cart) {
                    const productResponse = await fetch(`http://localhost:9999/products/${product.id}`);
                    if (!productResponse.ok) throw new Error(`Failed to fetch product ${product.id}`);

                    const productData = await productResponse.json();
                    const newQuantity = productData.quantity - product.quantity;

                    await fetch(`http://localhost:9999/products/${product.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ quantity: newQuantity })
                    });
                }

                alert("Payment successfully");
                localStorage.removeItem('cart');
                localStorage.removeItem('finalPrice');
                setCart([]);
                setPurchase(0);
                setShowSuccessMessage(true);
                navigate('/');
            } catch (error) {
                console.error("Failed to process order:", error);
                setShowErrorMessage(true);
                navigate('/failure');
            }
        } else {
            setShowErrorMessage(true);
            navigate('/failure');
        }
    };

    return (
        <Container>
            <h2>Purchase Order Information</h2>
            {showSuccessMessage && <Alert variant="success">Payment successful!</Alert>}
            {showErrorMessage && <Alert variant="danger">Payment failed. Please try again.</Alert>}
            <Row>
                <Form onSubmit={redirectToPayment}>
                    <Row>
                        <Col md="4" sm="12">
                            {['Full Name', 'Address', 'Mobile', 'Email'].map((field, idx) => (
                                <Row key={idx} style={{ margin: '10px 0px' }}>
                                    <Col md="4">{field}:</Col>
                                    <Col>
                                        <Form.Group as={Col} md="12">
                                            <Form.Control
                                                type={field === 'Email' ? 'email' : field === 'Mobile' ? 'number' : 'text'}
                                                value={field === 'Full Name' ? fullName : field === 'Address' ? address : field === 'Mobile' ? mobile : email}
                                                onChange={(e) => {
                                                    if (field === 'Full Name') setFullName(e.target.value);
                                                    else if (field === 'Address') setAddress(e.target.value);
                                                    else if (field === 'Mobile') setMobile(e.target.value);
                                                    else setEmail(e.target.value);
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            ))}
                        </Col>
                        
                        <Col md="8" sm="12">
                            <Table className="col-12">
                                <thead className="text-center">
                                    <tr>
                                        <th style={{backgroundColor:"blue", color:"white"}}>Name</th>
                                        <th style={{backgroundColor:"blue", color:"white"}}>Price</th>
                                        <th style={{  width: '170px',backgroundColor:"blue", color:"white" }}>Image</th>
                                        <th style={{backgroundColor:"blue", color:"white"}}>Quantity</th>
                                        <th style={{backgroundColor:"blue", color:"white"}}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(c => {
                                        const price = parseFloat(c.Price.replace('$', ''));
                                        const total = price * c.quantity;
                                        return (
                                            <tr key={c.id} >
                                                <td style={{textAlign:"center"}}>{c.Name}</td>
                                                <td style={{textAlign:"center"}}>{c.Price}</td>
                                                <td style={{textAlign:"center"}}>
                                                    <img src={c.image} alt={c.Name}
                                                        style={{ height: '150px', width: 'auto', objectFit: 'contain' }} />
                                                </td>
                                                <td style={{textAlign:"center"}}>{c.quantity}</td>
                                                <td style={{textAlign:"center", color:"blue"}}>{total}$</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                    <Row style={{ margin: '10px 0px' }}>
                        <Col md="4">
                            <Form.Control
                                type="input"
                                value={`Total bill:`}
                                readOnly
                                style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'right', border: 'none', backgroundColor: 'transparent' }}
                            />
                        </Col>
                        <Col md="8">
                            <Form.Group as={Col} md="12">
                                <Form.Control
                                    type="input"
                                    value={`${purchase} $ (include 8% VAT)`}
                                    readOnly
                                    style={{ fontSize: '1.5rem', fontWeight: 'bold', border: 'none', backgroundColor: 'transparent', color:'black' }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={{ margin: '10px 0px' }}>
                        <Col md={{ span: 12 }} className="d-flex justify-content-center">
                            <Button type="submit">Purchase</Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </Container>
    );
};

export default Checkout;
