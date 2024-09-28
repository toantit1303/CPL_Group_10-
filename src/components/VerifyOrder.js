import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table, Button, Card } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
export default function VerifyOrder() {
    const [user, setUser] = useState(null);
    const [verifiedUser, setVerifiedUser] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user')) || null;
        setUser(currentUser);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleCheckout = (e) => {
        const checkOutUser = { ...user, ...verifiedUser };
        localStorage.setItem('verifiedUser', JSON.stringify(checkOutUser));
        e.preventDefault();
        window.location.href = '/cart/CheckOut';
    };

    const alertst = () => {
        if (user == null) {
            alert('You must be logged in. ')
            navigate("/auth/Sign-in")
        }
    }
    return (
        <Container fluid className="mt-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8}>
                    <h2 className="mb-4 text-center">Verify Order</h2>
                    <Card>
                        <Card.Body>
                            <Table className="mb-4">
                                <tbody>
                                    {user ? (
                                        <div>
                                            <Row >
                                                <Col>
                                                    <Col xs={3} className="text-left"> ID :</Col>
                                                    <Col xs={9}>
                                                        <Form.Control
                                                            value={user.id}
                                                        />
                                                    </Col>
                                                </Col>

                                                <Col>

                                                    <Col xs={3} className="text-left">Name :</Col>
                                                    <Col xs={9}>
                                                        <Form.Control
                                                            type="text"
                                                            name="name"
                                                            value={user.fullName || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </Col>
                                                </Col>
                                            </Row>



                                            <Row >
                                                <Col>
                                                    <Col xs={3} className="text-left">Address:</Col>
                                                    <Col xs={9}>
                                                        <Form.Control
                                                            placeholder="Enter your Address"
                                                            type="text"
                                                            name="address"
                                                            value={user.address || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </Col>
                                                </Col>
                                                <Col>
                                                    <Col xs={3} className="text-left">Mobile :</Col>
                                                    <Col xs={9}>
                                                        <Form.Control
                                                            placeholder="Enter your Mobile"
                                                            type="text"
                                                            name="phone"
                                                            value={user.phone || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </Col>
                                                </Col>
                                            </Row>



                                            <Row >
                                                <Col xs={6}>
                                                    <Col xs={3} className="text-left">Email :</Col>
                                                    <Col xs={9}>
                                                        <Form.Control
                                                            type="email"
                                                            name="email"
                                                            value={user.email || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </Col>

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="text-center">
                                                    <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
                                                </Col>
                                            </Row>




                                        </div>
                                    ) : (
                                        <div>
                                            <Row >
                                                <Col>
                                                    <Col xs={3} className="text-left"> ID :</Col>
                                                    <Col xs={9}>
                                                        <Form.Control
                                                            placeholder="Enter your ID"

                                                        />
                                                    </Col>
                                                </Col>

                                                <Col>

                                                    <Col xs={3} className="text-left">Name :</Col>
                                                    <Col xs={9}>
                                                        <Form.Control
                                                            placeholder="Enter your Name"
                                                            type="text"
                                                            name="name"
                                                        />
                                                    </Col>
                                                </Col>

                                            </Row>
                                            <Row >
                                                <Col>
                                                    <Col xs={3} className="text-left">Address:</Col>
                                                    <Col xs={9}>
                                                        <Form.Control
                                                            placeholder="Enter your Address"
                                                            type="text"
                                                            name="address"
                                                        />
                                                    </Col>
                                                </Col>
                                                <Col>
                                                    <Col xs={3} className="text-left">Mobile :</Col>
                                                    <Col xs={9}>
                                                        <Form.Control
                                                            placeholder="Enter your Mobile"
                                                            type="text"
                                                            name="phone"
                                                        />
                                                    </Col>
                                                </Col>
                                            </Row>
                                            <Row >
                                                <Col xs={1} className="text-left">Email :</Col>
                                                <Col xs={5}>
                                                    <Form.Control
                                                        placeholder="Enter your Email"
                                                        type="email"
                                                        name="email"
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="text-center">
                                                    <Button variant="primary" onClick={alertst}>Checkout</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

