import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";

export default function Product({ data = [] }) {
    const [product, setProduct] = useState(data);
    const { cate_id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const productsInOnePage = 16;

    useEffect(() => {
        fetch(cate_id ? `http://localhost:9999/products?CatID=${cate_id}` : `http://localhost:9999/products`)
            .then(res => res.json())
            .then(result => setProduct(result));
    }, [cate_id]);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastProduct = currentPage * productsInOnePage;
    const indexOfFirstProduct = indexOfLastProduct - productsInOnePage;
    const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(product.length / productsInOnePage);

    return (
        <Container>
            <Row xs={1} md={4} className="g-4">
                {currentProducts.map(p => {
                    return (
                        <Col className="md-3" key={p.id}>
                            <div className="card" style={{ height: '100%', textAlign: 'center' }}>
                                <img src={p.image} className="card-img-top" alt="..."
                                    style={{ height: '200px', width: 'auto', objectFit: 'contain' }}
                                />
                                <div className="card-body">
                                    <h6><Link to={`/#`}>{p.Name}</Link></h6>
                                    <p className="card-text">{p.Price}</p>
                                    <Button variant="primary" >Add to cart</Button>
                                </div>
                            </div>
                        </Col>
                    );
                })}
            </Row>
            <Row>
                <Col style={{ justifyContent: 'center', margin: '20px' }}>
                    <ul className="pagination" style={{ justifyContent: 'center' }}>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li className="page-item" style={{ margin: '0px 10px' }} key={i}>
                                <Button className="page-link" onClick={() => handleClick(i + 1)}>
                                    {i + 1}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}
