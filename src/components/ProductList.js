import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table, Pagination, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Categories from './ExtraMenu'

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    useEffect(() => {

        fetch("http://localhost:9999/categories")
            .then(res => res.json())
            .then(result => setCategories(result))
    }, [])
    useEffect(() => {
        getCategories();
        getProducts();
    }, [search]);

    const getCategories = () => {
        fetch("http://localhost:9999/categories")
            .then(res => res.json())
            .then(result => setCategories(result))
    };

    const getProducts = () => {
        fetch(`http://localhost:9999/products`)
            .then(res => res.json())
            .then(result => {
                const searchResult = result.filter(p => p.Name.toLowerCase().includes(search.toLowerCase()));
                setProducts(searchResult);
            })
    };

    // Calculate the products to display on the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Generate pagination items
    const totalPages = Math.ceil(products.length / productsPerPage);
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
            <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
                {i}
            </Pagination.Item>
        );
    }

    return (
        <Container fluid>

            <Row>
                <Col md={2} >
                    <Categories data={categories} />
                </Col>
                <Col md={10}>
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
                            <Button> <Link style={{ color: "white", textDecoration: "none" }} to="/admin/product/create">Create Product</Link></Button>
                        </Col>
                    </Row>
                    <Row>

                        <Table className="col-12" >

                            {products.length === 0 ? (
                                <tbody>
                                    <tr>
                                        <td colSpan={7} style={{ textAlign: 'center', fontSize: "30px" }}>No products found</td>
                                    </tr>
                                </tbody>
                            ) : (
                                <>
                                    <thead className="text-center">
                                        <tr>
                                            <th style={{ backgroundColor: "blue", color: "white" }}>ID</th>
                                            <th style={{ backgroundColor: "blue", color: "white" }}>Name</th>
                                            <th style={{ backgroundColor: "blue", color: "white" }}>Price</th>
                                            <th style={{ backgroundColor: "blue", color: "white" }}>Category</th>
                                            <th style={{ backgroundColor: "blue", color: "white" }}>Quantity</th>
                                            <th style={{ backgroundColor: "blue", color: "white", width: '200px' }}>Image</th>
                                            <th style={{ backgroundColor: "blue", color: "white" }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentProducts.map(p => {
                                            const cat = categories.find(c => c.id == p.CatID);
                                            return (
                                                <tr key={p.id} style={{}}>
                                                    <td style={{ textAlign: "center" }}>{p.id}</td>
                                                    <td style={{ textAlign: "center" }}>{p.Name}</td>
                                                    <td style={{ textAlign: "center" }}>{p.Price}</td>
                                                    <td style={{ textAlign: "center" }}>{cat?.catName}</td>
                                                    <td style={{ textAlign: "center" }}>{p.quantity}</td>
                                                    <td style={{ textAlign: "center" }}>
                                                        <img src={p.image} alt={p.Name} className="img-fluid"
                                                            style={{ height: '200px', width: 'auto', objectFit: 'contain' }} />
                                                    </td>
                                                    <td style={{ textAlign: 'center', paddingTop: "80px" }}>
                                                        <Link to={`/admin/product/edit/${p.id}`} className="btn btn-success">Edit</Link>{" "}
                                                        <Link to={`/admin/product/delete/${p.id}`} className="btn btn-danger">Delete</Link>{" "}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </>
                            )}

                        </Table>
                    </Row>

                </Col>
            </Row>
            <Row>
                <Col>
                    <Pagination style={{ justifyContent: 'center' }}>
                        <Pagination.Prev onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} />
                        {paginationItems}
                        <Pagination.Next onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} />
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
}
