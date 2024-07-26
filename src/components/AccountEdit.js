import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Tab, Tabs } from 'react-bootstrap';

export default function AccountEdit({ account, show, handleClose, handleSave }) {
    const [newAccount, setNewAccount] = useState({ ...account });
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        setNewAccount({ ...account });
    }, [account]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAccount({
            ...newAccount,
            [name]: value
        });
    }

    const handlePasswordChange = () => {
        if (account.password === oldPassword) {
            handleSave({ ...newAccount, password: newPassword });
        } else {
            alert('Old password is incorrect');
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
            setNewAccount({
                ...newAccount,
                avatar: `data:image/png;base64,${base64String}`
            });
        };
        reader.readAsDataURL(file);
    }

    const handleSaveChanges = () => {
        handleSave(newAccount);
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="details" id="account-update-tabs">
                    <Tab eventKey="details" title="Details">
                        <Form>
                            <Form.Group controlId="formFullName">
                                <Form.Label>Fullname</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    value={newAccount.fullName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={newAccount.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formDob">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dob"
                                    value={newAccount.dob}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="gender"
                                    value={newAccount.gender}
                                    onChange={handleChange}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control type="file" onChange={handleImageChange} />
                            </Form.Group>
                        </Form>
                    </Tab>
                    <Tab eventKey="password" title="Password">
                        <Form>
                            <Form.Group controlId="formOldPassword">
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="oldPassword"
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formNewPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="newPassword"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={handlePasswordChange}>
                                Change Password
                            </Button>
                        </Form>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
