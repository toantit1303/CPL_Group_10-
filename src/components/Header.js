import React from 'react'
import { Container, Row, Col, Carousel, Nav, Navbar, Button } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom"
const Header = () => {
    const handleSignOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('verifiedUser');
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
                    backgroundColor: 'white ',
                    color: 'black'
                }}>
                    Your satisfaction is our mission
                </div>

                <Row style={{ padding: '0', textAlign: 'right' }} >
                    {user ? (
                        <Col md={12} style={{ display: 'flex', justifyContent: 'right', backgroundColor: 'red' }}>
                            <Button variant="link" style={{ margin: '0px 10px', color: 'white' }}>
                                <Link to={`/user/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {user.fullName}
                                </Link>
                            </Button>|
                            <Button variant="link" style={{ margin: '0px 10px', color: 'white' }} href="/history">History order</Button> |
                            <Button variant="link" onClick={handleSignOut} style={{ color: 'white' }}>Sign Out</Button>
                        </Col>
                    ) : (
                        <Col md={12} style={{ display: 'flex', justifyContent: 'right', backgroundColor: 'red' }}>
                            <Button variant="link" style={{ margin: '0px 10px', color: 'white' }} href="/auth/Sign-up">Sign Up</Button> |
                            <Button variant="link" style={{ margin: '0px 10px', color: 'white' }} href="/auth/Sign-in">Sign In</Button>
                        </Col>
                    )}
                </Row>
                <Row style={{ display: 'flex', padding: '0' }}>
                    <Col className="d-none d-lg-block d-print-block" md={12} xs={12} style={{ backgroundColor: 'white', padding: '0' }}>
                        <Carousel style={{ width: '100%' }}>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/image/banner1.jpg    "
                                    style={{ width: "100px", height: "350px" }}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/image/banner2.png    "
                                    style={{ width: "100px", height: "350px" }}
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/image/banner4.jpg"
                                    style={{ width: "100px", height: "350px" }}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>

                    </Col>
                </Row>
            </Row>
            <Row style={{ padding: '0' }}>
                <Navbar expand="md" bg="light" variant="light">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/products">Products</Nav.Link>
                                <Nav.Link href="/aboutus">About us</Nav.Link>
                                <Nav.Link href="#">Contact</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Row>
        </div>
    )
}

export default Header

