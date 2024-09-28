import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

export default function ProductDetail({ productId }) {
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [errorMessage, setErrorMessage] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch("http://localhost:9999/categories")
            .then(res => res.json())
            .then(result => setCategories(result));

        fetch(`http://localhost:9999/products?id=${productId}`)
            .then(res => res.json())
            .then(result => setProduct(result));
    }, [productId]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (productId, quantity) => {
        const productToAdd = product.find(p => p.id == productId);
        const existingProductIndex = cart.findIndex(item => item.id == productId);

        if (quantity > productToAdd.quantity) {
            setErrorMessage("Out of stock");
            return;
        }

        if (existingProductIndex !== -1) {
            const updatedCart = [...cart];
            const newQuantity = updatedCart[existingProductIndex].quantity + quantity;

            if (newQuantity > productToAdd.quantity) {
                setErrorMessage("Out of stock");
                return;
            }

            updatedCart[existingProductIndex].quantity = newQuantity;
            setCart(updatedCart);
        } else {
            if (productToAdd.quantity < 1) {
                setErrorMessage("Out of stock");
                return;
            }
            const updatedCart = [...cart, { ...productToAdd, quantity }];
            setCart(updatedCart);
        }
    };

    const salePrice = (price) => {
        if (price && typeof price === 'string') {
            const numericPrice = parseFloat(price.replace('$', ''));
            return (numericPrice * 1.3).toFixed(2);
        }
        return 0;
    };

    const handleQuantityChange = (operation) => {
        if (operation === 'increment' && quantity < product[0]?.quantity) {
            setQuantity(quantity + 1);
        } else if (operation === 'decrement' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };



    return (
        <Container>
            {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
            <Row>
                <Col>
                    {product.map(p => (
                        <img src={p.image} className="card-img-top"
                            style={{
                                height: 'auto',
                                width: 'auto',
                                maxHeight: '240px',
                                maxwidth: '100%',
                                objectFit: 'contain'
                            }}
                            alt={p.name} />
                    ))}
                </Col>
                <Col >
                    <Table className="col-12">
                        <tbody >
                            {product.map(p => {
                                const cat = categories.find(c => c.id == p.CatID);
                                const statusStyle = p.quantity === 0
                                    ? { color: 'red', fontWeight: 'bold' }
                                    : { color: 'green', fontWeight: 'bold' };
                                const statusText = p.quantity === 0 ? "Out of stock" : "In stock";
                                const sale = salePrice(p.Price);
                                return (
                                    <div key={p.id} >
                                        <Row>
                                            <Col xs={12} style={{ fontWeight: 'bold', fontSize: '25px', fontFamily: 'sans-serif' }}>{p.Name}</Col>
                                        </Row>
                                        <Row style={{ margin: '0px 0px' }}>
                                            Status: <Col xs={8} style={statusStyle}> {statusText}</Col>
                                        </Row>
                                        <Row style={{ margin: '0px' }}>
                                            Product id:<Col style={{ padding: '0px 4px', color: 'blue' }} xs={8}>{p.id}</Col>
                                        </Row>
                                        <Row >
                                            <Row style={{
                                                margin: '0px 0px',
                                                fontWeight: 'bold',
                                                fontSize: ' 50px',
                                                fontFamily: 'sans-serif',
                                                color: 'red',
                                                //backgroundColor: '#FFF0F0',
                                            }}>
                                                {p.Price}
                                            </Row>
                                            <Row style={{
                                                margin: '0px 0px',
                                                fontSize: ' 16px',
                                                color: 'gray',
                                                textDecoration: 'line-through',
                                                // backgroundColor: '#FFF0F0'
                                            }}>
                                                {sale}$
                                            </Row>
                                        </Row>

                                        <Row >
                                            <td size="sm"
                                                style={{
                                                    display: 'flex',
                                                    border: '1px solid black ',
                                                    borderRadius: '5px',
                                                    width: 'auto',
                                                    margin: '0px 10px',
                                                    padding: '2px ',
                                                }} >
                                                <Button variant="primary" size="sm" onClick={() => handleQuantityChange('decrement')}>-</Button>
                                                <td style={{ padding: '0px 20px' }}>{quantity}</td>
                                                <Button variant="primary" size="sm" onClick={() => handleQuantityChange('increment')}>+</Button>
                                            </td>
                                        </Row>
                                        <Row>
                                            <Button
                                                style={{
                                                    border: '2px solid blue',
                                                    borderRadius: '10px',
                                                    padding: '10px 20px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    backgroundColor: 'blue',
                                                    color: 'white',
                                                    justifyContent: 'center',
                                                }}
                                                variant="outline-danger"
                                                onClick={() => addToCart(p.id, quantity)}>Add to Cart</Button>
                                        </Row>
                                    </div>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row style={{ margin: '10px 0px', fontWeight: 'bold', fontSize: '22px', fontFamily: 'sans-serif' }}>
                Description
            </Row>
            <Row>
                <p style={{ margin: '0px' }}>Experience cutting-edge technology with our latest electronic device. Combining sleek design with powerful performance, this product offers:</p>
                <ul style={{ margin: '0px 50px' }}>
                    <li><strong>Advanced Features:</strong> Latest technology for superior functionality.</li>
                    <li><strong>High Efficiency:</strong> Fast and reliable operation.</li>
                    <li><strong>Stylish Design:</strong> Modern and elegant, fitting any space.</li>
                    <li><strong>User-Friendly:</strong> Easy to use with intuitive controls.</li>
                    <li><strong>Durable Build:</strong> Made with quality materials for lasting use.</li>
                </ul>
                <p>Ideal for personal use or as a gift, this device delivers both style and performance.</p>
            </Row>

        </Container>
    );
}