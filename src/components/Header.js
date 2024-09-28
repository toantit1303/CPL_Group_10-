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


                <Row style={{ padding: '0', textAlign: 'right' }} >
                    {user ? (
                        <Col md={12} style={{ display: 'flex', justifyContent: 'right', backgroundColor: 'skyblue' }}>
                            <Button variant="link" style={{ margin: '0px 10px', color: 'black', textDecoration: 'none' }}>
                                <Link to={`/user/${user.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    {user.fullName}
                                </Link>
                            </Button>
                            <Button variant="link" style={{ margin: '0px 10px', color: 'black', textDecoration: 'none' }} href="/history">History order</Button>
                            <Button variant="link" onClick={handleSignOut} style={{ color: 'black', textDecoration: 'none' }}>Sign Out</Button>
                        </Col>
                    ) : (
                        <Col md={12} style={{ display: 'flex', justifyContent: 'right', backgroundColor: 'skyblue' }}>
                            <Button variant="link" style={{ margin: '0px 10px', color: 'black' }} href="/auth/Sign-up">Sign Up</Button>
                            <Button variant="link" style={{ margin: '0px 10px', color: 'black' }} href="/auth/Sign-in">Sign In</Button>
                        </Col>
                    )}
                </Row>
                <Row style={{ display: 'flex', padding: '0' }}>
                    <Col className="d-none d-lg-block d-print-block" md={9} xs={12} style={{ backgroundColor: 'white', padding: '0' }}>
                        <Carousel style={{ width: '100%' }}>
                            <Carousel.Item>
                                <img
                                
                                    className="d-block w-100"
                                    src="/image/laptopbanner.jpg    "
                                    style={{ width: "100px", height: "360px", borderRadius:"10px" }}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/image/1.jpg    "
                                    style={{ width: "100px", height: "360px", borderRadius:"10px" }}
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/image/bannertv.jpg"
                                    style={{ width: "100px", height: "360px", borderRadius:"10px" }}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>

                    </Col>
                    <Col className="d-none d-lg-block d-print-block" md={3} xs={12} style={{ backgroundColor: 'white', padding: '10' }}>
                        <Row>
                            <img
                                className="d-block w-100"
                                style={{margin:"0px 10px ", padding:"0 ",width: "40px", height: "175px", borderRadius:"10px"}}
                                src="/image/11.jpg    "
                                alt="Second slide"
                            />
                        </Row>
                        <Row>
                            <img
                                className="d-block w-100"
                                style={{margin:"10px 0px 10px 10px", padding:"0 ",width: "40px", height: "175px", borderRadius:"10px"}}
                                src="/image/22.jpg    "
                                alt="Second slide"
                            />
                        </Row>

                    </Col>
                </Row>
            </Row>
            <Row>
                <Navbar expand="md" bg="light" >
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto" style={{ fontSize: '20px', marginLeft:"25%"}} >

                                <Nav.Link style={{ color: 'black',margin: "0 40px" }} href="/">Home</Nav.Link>
                                <Nav.Link style={{ color: 'black',margin: "0 40px" }} href="/products">Products</Nav.Link>
                                <Nav.Link style={{ color: 'black' ,margin: "0 40px"}} href="/aboutus">About us</Nav.Link>
                                <Nav.Link style={{ color: 'black' ,margin: "0 40px"}} href="#">Contact</Nav.Link>

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Row>
        </div>
    )
}

export default Header

