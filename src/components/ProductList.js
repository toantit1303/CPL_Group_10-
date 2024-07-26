import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table, Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

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
                    <Link to="/admin/product/create">Create Product</Link>
                </Col>
            </Row>
            <Table className="col-12" hover striped>
                {products.length === 0 ? (
                    <tbody>
                        <tr style={{ border: '1px solid black' }}>
                            <td colSpan={7} style={{ border: '1px solid black', textAlign: 'center' }}>No products found</td>
                        </tr>
                    </tbody>
                ) : (
                    <>
                        <thead className="text-center">
                            <tr>
                                <th style={{ border: '1px solid black' }}>ID</th>
                                <th style={{ border: '1px solid black' }}>Name</th>
                                <th style={{ border: '1px solid black' }}>Price</th>
                                <th style={{ border: '1px solid black' }}>Category</th>
                                <th style={{ border: '1px solid black' }}>Quantity</th>
                                <th style={{ border: '1px solid black', width: '200px' }}>Image</th>
                                <th style={{ border: '1px solid black' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map(p => {
                                const cat = categories.find(c => c.id == p.CatID);
                                return (
                                    <tr key={p.id} style={{ border: '1px solid black' }}>
                                        <td style={{ border: '1px solid black' }}>{p.id}</td>
                                        <td style={{ border: '1px solid black' }}>{p.Name}</td>
                                        <td style={{ border: '1px solid black' }}>{p.Price}</td>
                                        <td style={{ border: '1px solid black' }}>{cat?.catName}</td>
                                        <td style={{ border: '1px solid black' }}>{p.quantity}</td>
                                        <td style={{ border: '1px solid black' }}>
                                            <img src={p.image} alt={p.Name} className="img-fluid"
                                                style={{ height: '200px', width: 'auto', objectFit: 'contain' }} />
                                        </td>
                                        <td style={{ border: '1px solid black', textAlign: 'center' }}>
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
            <Row>
                <Col>
                    <Pagination>
                        <Pagination.Prev onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} />
                        {paginationItems}
                        <Pagination.Next onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} />
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
}
