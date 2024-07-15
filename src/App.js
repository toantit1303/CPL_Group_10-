import { Container, Row, Col } from 'react-bootstrap';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Home from './components/Home';
import Header from './components/Header';
import SignUp from './components/SignUp';


function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/products")
      .then(res => res.json())
      .then(result => setProducts(result))
    fetch("http://localhost:9999/categories")
      .then(res => res.json())
      .then(result => setCategories(result))
  }, [])

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Container fluid >
      <Row>
        <Header />
      </Row>
      <Row>
        <Col>
          <BrowserRouter>
            <Row>
              <Col>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/auth/Sign-up" element={<SignUp />} />
                </Routes>
              </Col>
            </Row>
          </BrowserRouter>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
