import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form } from 'react-bootstrap';

const HistoryOrder = () => {
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState("");
    const [products, setProducts] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const verifiedUser = JSON.parse(localStorage.getItem('user'));
        if (verifiedUser && verifiedUser.id) {
            setUserId(verifiedUser.id);
        }
        fetch(`http://localhost:9999/orders`)
            .then(res => res.json())
            .then(result => setOrders(result));
        fetch(`http://localhost:9999/products`)
            .then(res => res.json())
            .then(result => setProducts(result));
    }, []);

    const userHistory = orders.filter(order =>
        order.userInfo.some(user => user.uId === userId)
    );

    const filteredHistory = userHistory.filter(order => {
        const orderDate = new Date(order.orderDate);
        const start = startDate ? new Date(startDate) : new Date(0);
        const end = endDate ? new Date(endDate) : new Date();
        return orderDate >= start && orderDate <= end;
    });


    const sortedHistory = filteredHistory.sort((a, b) => {
        const dateA = new Date(a.orderDate);
        const dateB = new Date(b.orderDate);
        return dateB - dateA;
    });

    return (
        <Container>
            <h2>User Order History</h2>
            <Row style={{ marginBottom: '20px' }}>
                <Col md={6}>
                    <Form.Group controlId="formStartDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formEndDate">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            {sortedHistory.length === 0 ? (
                <p>No orders found</p>
            ) : (
                sortedHistory.map(order => (
                    <Row key={order.id} style={{ marginBottom: '20px' }}>
                        <Col md={12}>
                            <h4>Order ID: {order.id}</h4>
                            <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                            <p>Bill: {order.total}$</p>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Product ID</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th style={{ width: '200px' }}>Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.orderDetail.map(detail => {
                                        const product = products.find(p => p.id === detail.Pid);
                                        return (
                                            <tr key={detail.Pid}>
                                                <td>{detail.Pid}</td>
                                                <td>{detail.pName}</td>
                                                <td>{detail.Price}</td>
                                                <td>{detail.quantity}</td>
                                                <td>
                                                    <img src={product?.image} alt={product?.pName}
                                                        style={{ justifyContent: 'center', height: '150px', width: 'auto', objectFit: 'contain' }} />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                ))
            )}
        </Container>
    );
};

export default HistoryOrder;
