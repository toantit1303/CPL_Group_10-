import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from 'react-bootstrap';

export default function ManageCate() {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [editCategory, setEditCategory] = useState({}); // To store the edited category name

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        fetch("http://localhost:9999/categories")
            .then(res => res.json())
            .then(result => setCategories(result));
    };

    const handleAddCategory = () => {
        const maxId = categories.length > 0 ? Math.max(...categories.map(category => parseInt(category.id, 10))) : 0;
        const newId = (maxId + 1).toString();

        const category = { id: newId, catName: newCategory };

        fetch("http://localhost:9999/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
        })
            .then(res => res.json())
            .then(() => {
                setNewCategory("");
                getCategories();
            });
    };

    const handleUpdateCategory = (id) => {
        const updatedName = editCategory[id];

        if (updatedName) {
            fetch(`http://localhost:9999/categories/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, catName: updatedName }),
            })
                .then(res => res.json())
                .then(() => {
                    setEditCategory(prevState => ({ ...prevState, [id]: '' }));
                    getCategories();
                });
        }
    };

    const handleDeleteCategory = (id) => {
        fetch(`http://localhost:9999/categories/${id}`, {
            method: "DELETE",
        })
            .then(() => getCategories());
    };

    const handleEditChange = (id, value) => {
        setEditCategory(prevState => ({ ...prevState, [id]: value }));
    };

    return (
        <Container fluid>
            <Row style={{ justifyContent: 'center', margin: '20px' }}>
                <Col xs={6}>
                    <Form.Control
                        type='text'
                        placeholder="Enter to search"
                        style={{ border: "1px solid black" }}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
                <Col xs={3} style={{ textAlign: 'right' }}>
                    <Form.Control
                        type='text'
                        placeholder="New category"
                        style={{ border: "1px solid black" }}
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                </Col>
                <Col xs={3}>
                    <Button onClick={handleAddCategory}>Add Category</Button>
                </Col>
            </Row>
            {categories.filter(c => c.catName.toLowerCase().includes(search.toLowerCase())).map((c) => (
                <div key={c.id}>
                    <Row style={{ justifyContent: 'center', margin: '20px' }}>
                        <Col xs={2}>
                            <div>Category id number {c.id}:</div>
                        </Col>
                        <Col xs={4}>
                            <Form.Control
                                type="text"
                                defaultValue={c.catName}
                                style={{ border: "1px solid black" }}
                                onChange={(e) => handleEditChange(c.id, e.target.value)}
                            />
                        </Col>
                        <Col xs={4}>
                            <Button variant="success" onClick={() => handleUpdateCategory(c.id)}>Update</Button>
                            <Button variant="danger" onClick={() => handleDeleteCategory(c.id)}>Delete</Button>
                        </Col>
                    </Row>
                </div>
            ))}
        </Container>
    );
}
