import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';


export default function Cart() {
  const [cart, setCart] = useState([]);
  const [priceHaveToPay, setPriceHaveToPay] = useState(0);


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


  const handleBuy = (e) => {
    e.preventDefault();
    window.location.href = '/cart/VerifyOrder';
  };


  useEffect(() => {
    finalPrice();
  }, [cart]);


  return (
    <Container fluid>
      <Row xs={3} md={6} className="justify-content-end" style={{ margin: '10px' }}>
        <Button onClick={handleClearCart}>Clear Cart</Button>
      </Row>
      <Row>
        <Form onSubmit={handleBuy}>
          {cart.length === 0 ? (
            <h1 style={{ textAlign: 'center' }}>Cart empty, please choose product you want to buy</h1>
          ) : (
            <>
              <Table className="col-12" hover striped>
                <thead className="text-center">
                  <tr>
                    <th style={{ border: '1px solid black' }}>ID</th>
                    <th style={{ border: '1px solid black' }}>Name</th>
                    <th style={{ border: '1px solid black' }}>Price</th>
                    <th style={{ border: '1px solid black', width: '170px' }}>Image</th>
                    <th style={{ border: '1px solid black' }}>Quantity</th>
                    <th style={{ border: '1px solid black' }}>Total</th>
                    <th style={{ border: '1px solid black', width: '100px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(c => {
                    const price = c.Price && typeof c.Price === 'string' ? parseFloat(c.Price.replace('$', '')) : 0;
                    const total = price * c.quantity;
                    return (
                      <tr key={c.id} style={{ border: '1px solid black' }}>
                        <td style={{ border: '1px solid black' }}>{c.id}</td>
                        <td style={{ border: '1px solid black' }}>{c.Name}</td>
                        <td style={{ border: '1px solid black' }}>{c.Price}</td>
                        <td style={{ border: '1px solid black' }}><img src={c.image} alt={c.Name} style={{ height: '150px', width: 'auto', objectFit: 'contain' }} /></td>
                        <td style={{ border: '1px solid black' }}>{c.quantity}</td>
                        <td style={{ border: '1px solid black' }}>{total}$</td>
                        <td style={{ border: '1px solid black' }}>
                          <Button variant="danger"
                            style={{ margin: 'auto', display: 'block' }}
                            onClick={() => deleteProduct(c.id)}>Delete</Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              <Row>
                <Col className="text-right">VAT: 8%</Col>
              </Row>
              <Row>
                <Col className="text-right">Total: {priceHaveToPay} $</Col>
              </Row>
              <Button type="submit" style={{ margin: '10px' }}>Verify Order</Button>
            </>
          )}
        </Form>
      </Row>
    </Container>
  );
}
