import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('/avatar/ava0.jpg');
    const { pId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9999/categories")
            .then(res => res.json())
            .then(result => setCategories(result));
        fetch(`http://localhost:9999/products?id=${pId}`)
            .then(res => res.json())
            .then(result => {
                setProduct(result[0]);
                setImagePreview(result[0].image);
            });
    }, [pId]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            id: product.id,
            Name: e.target.Name.value,
            Price: `${e.target.Price.value}$`, // Format price as X$
            CatID: e.target.CatID.value,
            quantity: product.quantity,
            createDate: product.createDate,
            status: e.target.status.checked,
            image: image || product.image // Use new image if exists, otherwise use old one
        };

        try {
            const response = await fetch(`http://localhost:9999/products/${pId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Product updated successfully");
                navigate("/admin/products");
            } else {
                alert("Failed to update product");
            }
        } catch (error) {
            alert("Failed to update product");
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Link to="/admin/products"> Back to List </Link>
                </Col>
            </Row>
            <Row>
                <Col md="3" style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <img src={imagePreview} alt="Product" style={{
                        width: '100%',
                        height: '200px',
                        borderRadius: '8px',
                        objectFit: 'cover'
                    }} />
                    <Form.Group controlId="formFile" style={{ marginTop: '10px' }}>
                        <Form.Control type="file" onChange={handleImageChange} />
                    </Form.Group>

                </Col>
                <Col md="9">
                    <Form onSubmit={handleSubmit}>
                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="3"> ID: </Col>
                            <Col>
                                <Form.Group as={Col} md="12">
                                    <Form.Control type="text" defaultValue={product?.id} name="id" readOnly />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="3"> Name: </Col>
                            <Col>
                                <Form.Group as={Col} md="12">
                                    <Form.Control type="text" defaultValue={product?.Name} name="Name" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="3"> Price: </Col>
                            <Col>
                                <Form.Group as={Col} md="12">
                                    <Form.Control
                                        type="text"
                                        defaultValue={product?.Price ? product.Price.replace('$', '') : ''}
                                        name="Price"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="3"> Category: </Col>
                            <Col>
                                <Form.Group as={Col} md="12">
                                    <Form.Control as="select" defaultValue={product?.CatID} name="CatID">
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.catName}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="3"> Quantity: </Col>
                            <Col>
                                <Form.Group as={Col} md="12">
                                    <Form.Control type="text" defaultValue={product?.quantity} name="quantity" readOnly />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="3"> Create Date: </Col>
                            <Col>
                                <Form.Group as={Col} md="12">
                                    <Form.Control type="text" defaultValue={product?.createDate} name="createDate" readOnly />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="3"> Status: </Col>
                            <Col>
                                <Form.Group as={Col} md="2">
                                    <Form.Check type="checkbox" label="In stock" defaultChecked={product?.status} name="status" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row style={{ margin: '10px 0px' }}>
                            <Col md={{ span: 10, offset: 2 }}>
                                <Button type="submit">Update</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
