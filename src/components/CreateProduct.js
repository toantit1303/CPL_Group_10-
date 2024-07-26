import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CreateProduct({ categories = [] }) {
    const [products, setProduct] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        Name: '',
        Price: '',
        quantity: '',
        createDate: new Date().toISOString().split('T')[0], // Ngày hôm nay
        CatID: '',
        status: true,
        image: '/avatar/ava0.jpg'  // Default image
    });
    const [formErrors, setFormErrors] = useState({});
    const [imagePreview, setImagePreview] = useState('/avatar/ava0.jpg');

    useEffect(() => {
        fetch(`http://localhost:9999/products`)
            .then(res => res.json())
            .then(result => setProduct(result));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
            setFormData({
                ...formData,
                image: `data:image/jpeg;base64,${base64String}`
            });
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!formData.id) {
            errors.id = "Id cannot be empty.";
        } else if (!formData.id.match(/^P\d{3}$/)) {
            errors.id = "Invalid Id format. It should be PXXX.";
        } else if (products.some(product => product.id === formData.id)) {
            errors.id = "Id must be unique.";
        }

        if (!formData.Name.trim()) {
            errors.Name = "Name cannot be empty.";
        }

        if (isNaN(parseFloat(formData.Price)) || parseFloat(formData.Price) < 0) {
            errors.Price = "Price must be a non-negative number.";
        }

        if (isNaN(parseInt(formData.quantity)) || parseInt(formData.quantity) < 0) {
            errors.quantity = "Quantity must be a non-negative integer.";
        }

        if (!formData.CatID) {
            errors.CatID = "Please select a category.";
        }

        setFormErrors(errors);
        if (Object.keys(errors).length > 0) {
            return;
        }

        try {
            const response = await fetch('http://localhost:9999/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    Price: `${formData.Price}$`
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to create product.');
            }
            alert('Product created successfully.');
            setTimeout(() => {
                window.location.href = "/admin/products";
            }, 100);
        } catch (error) {
            alert('Failed to create product.');
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col style={{ justifyContent: 'center', textAlign: 'center' }}>
                    <h3>Create Product</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to="/admin/products">Back to products list</Link>
                </Col>
            </Row>
            <Row>
                <Col md={3} style={{ textAlign: 'center' }}>
                    <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                            width: '100%',
                            height: '200px',
                            borderRadius: '8px',
                            marginBottom: '10px',
                            objectFit: 'cover'
                        }}
                    />

                    <Form.Group>
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={9}>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="6">

                                <Row style={{ margin: '10px 0px' }}>
                                    <Col md="12">
                                        <Form.Group controlId="formId">
                                            <Form.Label>ID (*)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="id"
                                                value={formData.id}
                                                onChange={handleChange}
                                            />
                                            <Form.Text style={{ color: "red" }}>{formErrors.id}</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={{ margin: '10px 0px' }}>
                                    <Col md="12">
                                        <Form.Group controlId="formName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="Name"
                                                value={formData.Name}
                                                onChange={handleChange}
                                            />
                                            <Form.Text style={{ color: "red" }}>{formErrors.Name}</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={{ margin: '10px 0px' }}>
                                    <Col md="12">
                                        <Form.Group controlId="formPrice">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="Price"
                                                value={formData.Price}
                                                onChange={handleChange}
                                            />
                                            <Form.Text style={{ color: "red" }}>{formErrors.Price}</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="6">
                                <Row style={{ margin: '10px 0px' }}>
                                    <Col md="12">
                                        <Form.Group controlId="formQuantity">
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="quantity"
                                                value={formData.quantity}
                                                onChange={handleChange}
                                            />
                                            <Form.Text style={{ color: "red" }}>{formErrors.quantity}</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={{ margin: '10px 0px' }}>
                                    <Col md="12">
                                        <Form.Group controlId="formCreateDate">
                                            <Form.Label>Create Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="createDate"
                                                value={formData.createDate}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={{ margin: '10px 0px' }}>
                                    <Col md="12">
                                        <Form.Group controlId="formCatID">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Select
                                                name="CatID"
                                                value={formData.CatID}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map(category => (
                                                    <option key={category.id} value={category.id}>{category.catName}</option>
                                                ))}
                                            </Form.Select>
                                            <Form.Text style={{ color: "red" }}>{formErrors.CatID}</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={{ margin: '10px 0px' }}>
                                    <Col md="12">
                                        <Form.Group>
                                            <Form.Check
                                                type="checkbox"
                                                label="Stock"
                                                name="status"
                                                checked={formData.status}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{ margin: '10px 0px' }}>
                            <Col md={{ span: 4, offset: 4 }}>
                                <Button variant="primary" type="submit">Create</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
