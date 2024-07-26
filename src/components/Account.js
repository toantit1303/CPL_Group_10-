import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AccountEdit from './AccountEdit';

export default function Account() {
    const [account, setAccount] = useState({});
    const { uId } = useParams();
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:9999/accounts/${uId}`)
            .then(res => res.json())
            .then(result => setAccount(result));
    }, [uId]);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSave = (updatedAccount) => {
        fetch(`http://localhost:9999/accounts/${uId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedAccount)
        }).then(() => {
            setAccount(updatedAccount);
            handleClose();
        });
    }

    return (
        <Container fluid>
            <Row>
                <Col xs="2" style={{ justifyContent: 'center', textAlign: 'left' }}>
                    <img src={account?.avatar} className="card-img-top"
                        style={{
                            borderRadius: '50%',
                            width: '10vw',
                            height: '10vw',
                            maxWidth: '150px',
                            maxHeight: '150px',
                        }} onClick={handleShow} />
                </Col>
                <Col xs="10" style={{ justifyContent: 'center', textAlign: 'left' }}>
                    <Form>
                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="2" style={{ justifyContent: 'center', textAlign: 'left' }}> ID: </Col>
                            <Col>
                                <Form.Group as={Col} md="12" >
                                    <Form.Control type="text" readOnly defaultValue={account?.id} name="id" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="2" style={{ justifyContent: 'center', textAlign: 'left' }}> Fullname: </Col>
                            <Col>
                                <Form.Group as={Col} md="12" >
                                    <Form.Control type="text" readOnly defaultValue={account?.fullName} name="fullName" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="2" style={{ justifyContent: 'center', textAlign: 'left' }}> Email : </Col>
                            <Col>
                                <Form.Group as={Col} md="12" controlId="formGridProductPrice">
                                    <Form.Control type="text" readOnly defaultValue={account?.email} name="Email" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="2" style={{ justifyContent: 'center', textAlign: 'left' }}> Gender : </Col>
                            <Col>
                                <Form.Group as={Col} md="12">
                                    <Form.Control type="text" readOnly defaultValue={account?.gender === "male" ? "Female" : "Male"} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="2" style={{ justifyContent: 'center', textAlign: 'left' }}> Date of birth: </Col>
                            <Col>
                                <Form.Group as={Col} md="12" >
                                    <Form.Control type="text" readOnly defaultValue={account?.dob} name="dob" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row style={{ margin: '10px 0px' }}>
                            <Col md={{ span: 10, offset: 2 }}>
                                <Button onClick={handleShow}>Update</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col >
            </Row >

            <AccountEdit
                account={account}
                show={show}
                handleClose={handleClose}
                handleSave={handleSave}
            />
        </Container>
    )
}
