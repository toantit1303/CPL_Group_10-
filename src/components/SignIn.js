import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function SignIn() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:9999/accounts`)
            .then(res => res.json())
            .then(result => setAccounts(result))
            .catch(error => console.error('Error fetching accounts:', error));
    }, []);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = accounts.find(acc => acc.email === loginEmail && acc.password === loginPassword);

        if (user) {
            if (user.ban) {
                alert('Your account has been banned');
                return;
            }
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = user.role === 'admin' ? '/admin/products' : '/';
        } else {
            setError('Invalid login credentials');
        }
    }

    return (
        <Row >
            <section
                className="vh-100 gradient-custom"
                style={{
                    backgroundImage: 'url(/image/4k.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <Link style={{ textAlign: 'right', margin: '20px 30px 0px 0px', fontStyle: 'bold', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} to="/" > Home</Link>
                <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-7 col-lg-4 col-xl-4">
                            <div
                                className="card shadow-2-strong card-registration"
                                style={{
                                    borderRadius: '15px',
                                    boxShadow: '4px 4px 4px purple',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    // backgroundImage: 'url(/image/4k1.jpg)',
                                }}
                            >
                                <Link style={{
                                    textAlign: 'right',
                                    margin: '20px 30px 0px 0px',
                                    fontStyle: 'bold',
                                    color: 'white',
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                    fontWeight: 'bold'
                                }} to="/auth/Sign-up" > Sign up</Link>
                                <div className="card-body p-2 p-md-5">
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5"
                                        style={{
                                            color: 'white',
                                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                        }}>Sign In</h3>
                                    {error && (
                                        <Alert variant="danger">{error}</Alert>
                                    )}
                                    <Form onSubmit={handleSubmit}>
                                        <div className="row-md-12 mb-12">
                                            <Row md-12>
                                                <div className="col-md-12 mb-4">
                                                    <Form.Group className="form-outline">
                                                        <Form.Control
                                                            type="text"
                                                            id="loginEmail"
                                                            className="form-control form-control-lg"
                                                            value={loginEmail}
                                                            onChange={(e) => setLoginEmail(e.target.value)}
                                                            required
                                                            placeholder='Email'
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Row>
                                            <Row md-12>
                                                <div className="col-md-12 mb-4">
                                                    <Form.Group className="form-outline">
                                                        <Form.Control
                                                            type="password"
                                                            id="loginPassword"
                                                            className="form-control form-control-lg"
                                                            value={loginPassword}
                                                            onChange={(e) => setLoginPassword(e.target.value)}
                                                            required
                                                            placeholder='Password'
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Row>
                                        </div>
                                        <div className="mt-4 pt-2">
                                            <Button className="btn btn-primary btn-lg" type="submit">Login</Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Row>
    );
}