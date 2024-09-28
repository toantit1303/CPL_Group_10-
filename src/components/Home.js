import React from 'react'
import { Container, Row, Col, Carousel, Offcanvas } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import Categories from './ExtraMenu'


export default function Home() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {

        fetch("http://localhost:9999/categories")
            .then(res => res.json())
            .then(result => setCategories(result))
    }, [])
    return (
        <Container >
            <Row>
               
                    <Col md={2} >
                        <Categories data={categories} />
                    </Col>
                <Col md={10}>
                    <div className="jumbotron">
                        <h1 className="display-4">Welcome to shop!!</h1>
                    </div>
                </Col>

            </Row>
        </Container>
    )
}
