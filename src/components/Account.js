import React from 'react'
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";

export default function Account() {
    const [account, setAccount] = useState({});
    const { uId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:9999/accounts/${uId}`)
            .then(res => res.json())
            .then(result => setAccount(result))
    }, [])



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
                        }} />
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
                                <Button type="submit">Update</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col >
            </Row >
        </Container >
    )
}

