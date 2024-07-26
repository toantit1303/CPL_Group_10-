import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";

export default function ProductDetail() {
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const { pId } = useParams();
    const numberCartProduct = cart.length;

    useEffect(() => {
        fetch("http://localhost:9999/categories")
            .then(res => res.json())
            .then(result => setCategories(result));

        fetch(`http://localhost:9999/products?id=${pId}`)
            .then(res => res.json())
            .then(result => setProduct(result));
    }, [pId]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (productId) => {
        const existingProductIndex = cart.findIndex(item => item.id === productId);
        if (existingProductIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            const productToAdd = product.find(p => p.id === productId);
            const updatedCart = [...cart, { ...productToAdd, quantity: 1 }];
            setCart(updatedCart);
        }
    };


    return (
        <Container fluid>
            <Row>
                <Col>
                    <h5 className="fa fa-shopping-cart" style={{ textAlign: 'right' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16" style={{ color: 'blue' }}>
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                        <Link to={`/cart`}>Cart: ({numberCartProduct})</Link>
                    </h5>
                </Col>
            </Row>
            <Row>
                <Col xs="2" style={{ justifyContent: 'center', textAlign: 'left' }}>
                    {product.map(p => (
                        <img src={p.image} className="card-img-top" style={{ width: '100%' }} alt={p.Name} />
                    ))}
                </Col>
                <Col xs="10" style={{ justifyContent: 'center', textAlign: 'left' }}>
                    <Table className="col-12">
                        <tbody>
                            {product.map(p => {
                                const cat = categories.find(c => c.id == p.CatID);
                                return (
                                    <div key={p.id}>
                                        <Row style={{ margin: '10px 0px' }}>
                                            <Col xs={2}>ID</Col>
                                            <Col xs={10}>: {p.id}</Col>
                                        </Row>
                                        <Row style={{ margin: '10px 0px' }}>
                                            <Col xs={2}>Name</Col>
                                            <Col xs={10}>: {p.Name}</Col>
                                        </Row>
                                        <Row style={{ margin: '10px 0px' }}>
                                            <Col xs={2}>Price</Col>
                                            <Col xs={10}>: {p.Price}</Col>
                                        </Row>
                                        <Row style={{ margin: '10px 0px' }}>
                                            <Col xs={2}>Category Name</Col>
                                            <Col xs={10}>: {cat?.catName}</Col>
                                        </Row>
                                        <Row style={{ margin: '10px 0px' }}>
                                            <Col xs={2}>Quantity</Col>
                                            <Col xs={10}>: {p.quantity}</Col>
                                        </Row>
                                        <Row style={{ margin: '10px 0px' }}>
                                            <Col xs={2}>Status</Col>
                                            <Col xs={10}>: {p.status ? "In stock" : "Out of stock"}</Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Button variant="primary" onClick={() => addToCart(p.id)}>Add to Cart</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}
