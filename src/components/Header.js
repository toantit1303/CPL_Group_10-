import React from 'react'
import { Container, Row, Col, Carousel, Nav, Navbar, Button } from 'react-bootstrap'
const Header = () => {
    const handleSignOut = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div style={{ padding: '0' }}>
            <Row style={{ padding: '0' }}>
                <div style={{
                    textAlign: 'center',
                    fontStyle: 'italic',
                    fontSize: '20px',
                    padding: '30px',
                    backgroundColor: 'blue ',
                    color: 'white'
                }}>
                    Your satisfaction is our mission
                </div>

                <Row style={{ padding: '0', textAlign: 'right' }} >
                    <Col md={12} className="d-none d-lg-block d-print-block" style={{ display: 'flex', justifyContent: 'right', backgroundColor: 'blue' }}>
                        <Button variant="link" style={{ margin: '0px 10px', color: 'white' }} href="/auth/Sign-up">Sign Up</Button> |
                        <Button variant="link" style={{ margin: '0px 10px', color: 'white' }} >Sign In</Button>
                    </Col>
                </Row>
                <Row style={{ display: 'flex', padding: '0' }}>
                    <Col className="d-none d-lg-block d-print-block" md={12} xs={12} style={{ backgroundColor: 'white', padding: '0' }}>
                        <Carousel style={{ width: '100%' }}>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/assets/event-5.jpg    "
                                    style={{ width: "100px", height: "350px" }}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/assets/event-6.jpg"
                                    style={{ width: "100px", height: "350px" }}
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/assets/event-7.jpg"
                                    style={{ width: "100px", height: "350px" }}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>

                    </Col>
                </Row>
            </Row>

        </div>
    )
}

export default Header

