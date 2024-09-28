import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
        <Row style={{ background: 'skyblue', marginTop: "50px" }}>
            <div className="container p-4 pb-0">
                <Row>


                    <Col md={4}>
                        <h6>Products</h6>
                        <Row>
                            <Col md={6}>
                                <p>Tivi</p>
                                <p>Máy giặt</p>
                                <p>Điều hòa</p>
                                <p>Tủ lạnh</p>
                            </Col>
                            <Col md={6}>
                                <p>Điện thoại</p>
                                <p>Laptop</p>
                                <p>Desktop</p>
                            </Col>
                        </Row>
                    </Col>




                    <Col md={4}>
                        <h6 >Contact</h6>
                        <p><i className="fas fa-home mr-3"></i> Thach That, Ha Noi</p>
                        <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>
                        <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                        <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
                    </Col>

                    <Col md={4}>
                        <h6 >Follow us</h6>
                        <a className="btn btn-gray btn-floating m-1" href="#!   " role="button">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a className="btn btn-gray btn-floating m-1" href="#!" role="button">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a className="btn btn-gray btn-floating m-1" href="#!" role="button">
                            <i className="fab fa-google"></i>
                        </a>
                        <a className="btn btn-gray btn-floating m-1" href="#!" role="button">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a className="btn btn-gray btn-floating m-1" href="#!" role="button">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a className="btn btn-gray btn-floating m-1" href="#!" role="button">
                            <i className="fab fa-github"></i>
                        </a>
                    </Col>
                </Row>
            </div>


        </Row>
    )
}

export default Footer;
