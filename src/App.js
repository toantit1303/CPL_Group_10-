import { Container, Row, Col } from 'react-bootstrap';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Home from './components/Home';
import Header from './components/Header';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Product from './components/Products';
import ProductList from './components/ProductList';
import Categories from './components/ExtraMenu';
import Account from './components/Account';


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
            <Col xs={12} sm={3} md={5} lg={2}>
                <Categories data={categories} />
              </Col>
              <Col xs={12} sm={9} md={7} lg={10}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Product data={products} />} />
                  <Route path="/product/category/:cate_id" element={<Product />} />
                  <Route path="/user/:uId" element={<Account />} />
                  <Route path="/auth/Sign-up" element={<SignUp />} />
                  <Route path="/auth/Sign-in" element={<SignIn />} />


                  {user && user.role === 'admin' ? (
                    <>
                      <Route path="/admin/products" element={<ProductList />} />
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
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
