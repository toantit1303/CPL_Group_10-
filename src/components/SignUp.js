import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function SignUp() {
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('female');
    const [dob, setDob] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState('');

    useEffect(() => {
        fetch(`http://localhost:9999/accounts`)
            .then((res) => res.json())
            .then((result) => setAccounts(result))
    }, []);

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errorMsg = '';

        if (!validateEmail(email)) {
            errorMsg += 'Invalid email format.\n';
        }
        if (accounts.some((acc) => acc.email === email)) {
            errorMsg += 'Email already exists.\n';
        }
        if (!validatePassword(password)) {
            errorMsg += 'Password must have at least 8 characters.\n';
        }

        if (errorMsg) {
            setErrors(errorMsg);
            return;
        }

        const newAccount = {
            id: (Math.random() * 10000).toString(16).slice(0, 4),
            email,
            password,
            fullName: `${firstName} ${lastName}`,
            gender,
            dob,
            phoneNumber,
            avatar: '/avatar/ava0.jpg',
            role: 'user',
            ban: false,
        };

        fetch(`http://localhost:9999/accounts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAccount),
        })
            .then((res) => res.json())
            .then(() => {
                alert('Account created successfully');
                setEmail('');
                setPassword('');
                setFirstName('');
                setLastName('');
                setGender('female');
                setDob('');
                setPhoneNumber('');
                setErrors('');
                navigate('/auth/Sign-in');
            })
            .catch((error) => console.error('Error creating account:', error));
    };

    return (
        <Row>
            <section className="vh-100 gradient-custom"
                style={{
                    backgroundImage: 'url(/image/4k.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
                <Link style={{
                    textAlign: 'right',
                    margin: '20px 30px 0px 0px',
                    fontStyle: 'bold', color: 'white',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                }} to="/" > Home</Link>
                <div className="container py-5 h-100">

                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-2-strong card-registration"
                                style={{
                                    borderRadius: '15px',
                                    boxShadow: '4px 4px 4px purple',
                                    // backgroundImage: 'url(/image/4k.jpg)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                }}>
                                <Link style={{
                                    textAlign: 'right',
                                    margin: '20px 30px 0px 0px',
                                    fontStyle: 'bold', color: 'white',
                                    textShadow: '2px 2p  x 4px rgba(0, 0, 0, 0.5)',
                                    fontWeight: 'bold'
                                }} to="/auth/Sign-in" > Sign In</Link>
                                <div className="card-body p-4 p-md-5">

                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5" style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Sign Up</h3>
                                    {errors && (
                                        <Alert variant="danger">{errors}</Alert>
                                    )}
                                    <Form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <Form.Group className="form-outline">
                                                    <Form.Control
                                                        type="text"
                                                        id="firstName"
                                                        className="form-control form-control-lg"
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        required
                                                        placeholder='FirstName'
                                                    />

                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <Form.Group className="form-outline">
                                                    <Form.Control
                                                        type="text"
                                                        id="lastName"
                                                        className="form-control form-control-lg"
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        required
                                                        placeholder='LastName'
                                                    />

                                                </Form.Group>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-4 d-flex align-items-center">
                                                <Form.Group className="form-outline datepicker w-100">
                                                    <Form.Control
                                                        type="date"
                                                        id="birthdayDate"
                                                        className="form-control form-control-lg"
                                                        value={dob}
                                                        onChange={(e) => setDob(e.target.value)}
                                                        required
                                                        placeholder='Dob'
                                                    />

                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6 mb-4" style={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                                                <h5 className="mb-2 pb-1" style={{ color: 'white', fontWeight: 'bold' }}>Gender: </h5>
                                                <Form.Check
                                                    type="radio"
                                                    label="Female"
                                                    name="gender"
                                                    id="femaleGender"
                                                    value="female"
                                                    checked={gender === 'female'}
                                                    onChange={(e) => setGender(e.target.value)}

                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Male"
                                                    name="gender"
                                                    id="maleGender"
                                                    value="male"
                                                    checked={gender === 'male'}
                                                    onChange={(e) => setGender(e.target.value)}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Other"
                                                    name="gender"
                                                    id="otherGender"
                                                    value="other"
                                                    checked={gender === 'other'}
                                                    onChange={(e) => setGender(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-4 pb-2">
                                                <Form.Group className="form-outline">
                                                    <Form.Control
                                                        type="email"
                                                        id="emailAddress"
                                                        className="form-control form-control-lg"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                        placeholder='Email'
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6 mb-4 pb-2">
                                                <Form.Group className="form-outline">
                                                    <Form.Control
                                                        type="password"
                                                        id="password"
                                                        className="form-control form-control-lg"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                        placeholder='Password'
                                                    />
                                                </Form.Group>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-2">
                                            <Button className="btn btn-primary btn-lg" type="submit">Submit</Button>
                                        </div>

                                    </Form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </Row>
    );
}