import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [purchase, setPurchase] = useState([]);
    const [cart, setCart] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const verifiedUser = JSON.parse(localStorage.getItem('verifiedUser'));
        if (verifiedUser) {
            setFullName(verifiedUser.fullName || "");
            setAddress(verifiedUser.address || "");
            setMobile(verifiedUser.phone || "");
            setEmail(verifiedUser.email || "");
        }
        const cartProduct = JSON.parse(localStorage.getItem('cart'));
        setCart(cartProduct || []);
        const totalBill = JSON.parse(localStorage.getItem('finalPrice'));
        setPurchase(totalBill || []);

    }, []);

    const saveOrder = async (e) => {
        e.preventDefault();

        try {
            const verifiedUser = JSON.parse(localStorage.getItem('verifiedUser'));
            const cart = JSON.parse(localStorage.getItem('cart'));

            if (!verifiedUser || !cart) {
                alert("Missing user or cart information");
                return;
            }

            if (!fullName || !address || !mobile || !email) {
                alert("Missing user information");
                return;
            }

            const order = {
                id: new Date().getTime().toString(),
                orderDate: new Date().toISOString(),
                status: 1,
                total: purchase,
                userInfo: [
                    {
                        uId: verifiedUser.id,
                        fullName: fullName,
                        address: address,
                        mobile: mobile,
                        email: email
                    }
                ],
                orderDetail: cart.map(product => ({
                    Pid: product.id,
                    pName: product.Name,
                    Price: product.Price,
                    vat: "8%",
                    quantity: product.quantity,
                    discount: ""
                }))
            };
            await fetch('http://localhost:9999/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
            localStorage.removeItem('cart');
            localStorage.removeItem('finalPrice');
            alert("Purchase  successfully");
            navigate('/');
        } catch (error) {
            alert("Failed to Purchase ");
        }
    };

    return (
        <Container>
            <h2>Purchase Order Information</h2>
            <Row>
                <Form onSubmit={saveOrder}>
                    <Row>
                        <Col md="4" sm="12" style={{ justifyContent: 'center', textAlign: 'left' }}>
                            <Row style={{ margin: '10px 0px' }}>
                                <Col md="4" style={{ justifyContent: 'center', textAlign: 'left' }}> Full Name: </Col>
                                <Col>
                                    <Form.Group as={Col} md="12">
                                        <Form.Control
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={{ margin: '10px 0px' }}>
                                <Col md="4" style={{ justifyContent: 'center', textAlign: 'left' }}> Address: </Col>
                                <Col>
                                    <Form.Group as={Col} md="12">
                                        <Form.Control
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row style={{ margin: '10px 0px' }}>
                                <Col md="4" style={{ justifyContent: 'center', textAlign: 'left' }}> Mobile: </Col>
                                <Col>
                                    <Form.Group as={Col} md="12">
                                        <Form.Control
                                            type="number"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row style={{ margin: '10px 0px' }}>
                                <Col md="4" style={{ justifyContent: 'center', textAlign: 'left' }}> Email : </Col>
                                <Col>
                                    <Form.Group as={Col} md="12">
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="8" sm="12">
                            <Table className="col-12" hover striped>
                                <thead className="text-center">
                                    <tr>
                                        <th style={{ border: '1px solid black' }}>Name</th>
                                        <th style={{ border: '1px solid black' }}>Price</th>
                                        <th style={{ border: '1px solid black', width: '170px' }}>Image</th>
                                        <th style={{ border: '1px solid black' }}>Quantity</th>
                                        <th style={{ border: '1px solid black' }}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.map(c => {
                                            const price = parseFloat(c.Price.replace('$', ''));
                                            const total = price * c.quantity;
                                            return (
                                                <tr key={c.id} style={{ border: '1px solid black' }}>
                                                    <td style={{ border: '1px solid black' }}>{c.Name}</td>
                                                    <td style={{ border: '1px solid black' }}>{c.Price}</td>
                                                    <td style={{ border: '1px solid black' }}><img src={c.image} alt={c.Name}
                                                        style={{ height: '150px', width: 'auto', objectFit: 'contain' }} /></td>
                                                    <td style={{ border: '1px solid black' }}>{c.quantity}</td>
                                                    <td style={{ border: '1px solid black' }}>{total}$</td>
                                                </tr>
                                            )
                                        })
                                    }
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
                        <Col md="8" >
                            <Form.Group as={Col} md="12">
                                <Form.Control
                                    type="input"
                                    value={`${purchase} $ (include 8% VAT)`}
                                    readOnly
                                    style={{ fontSize: '1.5rem', fontWeight: 'bold', border: 'none', backgroundColor: 'transparent' }}
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
