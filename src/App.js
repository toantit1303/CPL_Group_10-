import { Container, Row, Col } from 'react-bootstrap';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Home from './components/Home';
import Product from './components/Products';
import Header from './components/Header';
import Footer from './components/Footer';



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


  function AreNotAdmin() {
    alert(`You are not admin`);
    return <Navigate to="/" />;
  }

  return (
    <BrowserRouter>
      <Container fluid >
        <Row>
          <Header />
        </Row>
        <Row>
          <Col>
            <Row>
              <Col xs={12} sm={9} md={7} lg={10}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Product data={products} />} />
                  {user && user.role === 'admin' ? (
                    <>

                    </>
                  ) : (
                    <Route path="/admin/*" element={<AreNotAdmin />} />
                  )}
                </Routes>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Footer />
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
