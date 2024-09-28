import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [priceHaveToPay, setPriceHaveToPay] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:9999/products');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('finalPrice', JSON.stringify(priceHaveToPay));
  }, [priceHaveToPay]);

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };

  const totalProductPrice = () => {
    let totalPrice = 0;
    cart.forEach(item => {
      if (item.Price && typeof item.Price === 'string') {
        const price = parseFloat(item.Price.replace('$', ''));
        totalPrice += price * item.quantity;
      }
    });
    return totalPrice;
  };

  const finalPrice = () => {
    const totalPrice = totalProductPrice();
    const finalPrice = totalPrice * 1.08;
    setPriceHaveToPay(finalPrice);
    return finalPrice;
  };

  const deleteProduct = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (productId, change) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        const product = products.find(p => p.id === productId);
        const newQuantity = item.quantity + change;
        if (newQuantity <= 0 || newQuantity > product.quantity) {
          return item; // Không thay đổi nếu số lượng mới không hợp lệ
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleBuy = (e) => {
    e.preventDefault();
    window.location.href = '/cart/VerifyOrder';
  };

  useEffect(() => {
    finalPrice();
  }, [cart]);

  return (
    <Container >
      <Row xs={3} md={6} className="justify-content-end" style={{ margin: '10px' }}>
        <Button onClick={handleClearCart}>Clear Cart</Button>
      </Row>
      <Row>
        <Form onSubmit={handleBuy}>
          {cart.length === 0 ? (
            <h1 style={{ textAlign: 'center' }}>Cart empty, please choose product you want to buy</h1>
          ) : (
            <>
              <Table className="col-12" >
                <thead className="text-center">
                  <tr>
                    <th style={{ backgroundColor: 'blue', color:"white", fontSize:"20px" }}>ID</th>
                    <th  style={{ backgroundColor: 'blue', color:"white", fontSize:"20px" }}>Name</th>
                    <th  style={{ backgroundColor: 'blue', color:"white", fontSize:"20px" }}>Price</th>
                    <th style={{ width: '170px',backgroundColor: 'blue', color:"white", fontSize:"20px" }}>Image</th>
                    <th  style={{ backgroundColor: 'blue', color:"white" , fontSize:"20px"}}>Quantity</th>
                    <th  style={{ backgroundColor: 'blue', color:"white", fontSize:"20px" }}>Total Price</th>
                    <th style={{ width: '100px',backgroundColor: 'blue', color:"white" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(c => {
                    const product = products.find(p => p.id === c.id);
                    if (!product) return null;
                    const price = c.Price && typeof c.Price === 'string' ? parseFloat(c.Price.replace('$', '')) : 0;
                    const total = price * c.quantity;
                    return (
                      <tr key={c.id} >
                        <td style={{textAlign:"center" , fontSize:"25px"}}>{c.id}</td>
                        <td style={{textAlign:"center", fontSize:"25px"}}>{c.Name}</td>
                        <td style={{textAlign:"center", fontSize:"25px"}}>{c.Price}</td>
                        <td style={{textAlign:"center", fontSize:"25px"}}><img src={c.image} alt={c.Name} style={{ height: '150px', width: 'auto', objectFit: 'contain' }} /></td>
                        <td style={{textAlign:"center", fontSize:"25px"}}>
                          <Button variant="danger" size="sm" onClick={() => handleQuantityChange(c.id, -1)} disabled={c.quantity === 1}>-</Button>
                          {' '}{c.quantity}{' '}
                          <Button variant="danger" size="sm" onClick={() => handleQuantityChange(c.id, 1)} disabled={c.quantity >= product.quantity}>+</Button>
                        </td>
                        <td style={{color:"blue", fontSize:"25px",textAlign:"center"}}>{total}$</td>
                        <td >
                          <Button variant="danger
                          "
                            style={{ margin: 'auto', display: 'block' }}
                            onClick={() => deleteProduct(c.id)}>X</Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              <Row style={{ fontSize: "25px", fontWeight: "bold" }} className="justify-content-end">
                <Col md="auto" className="text-right">VAT: 8%</Col>
              </Row>
              <Row style={{ fontSize: "25px", fontWeight: "bold " }} className="justify-content-end">
                <Col md="auto" className="text-right">Total: {priceHaveToPay} $</Col>
              </Row>
              <Button type="submit" className="float-end" style={{ margin: '10px' }}>Verify Order</Button>
            </>
          )}
        </Form>
      </Row>
    </Container>
  );
}
