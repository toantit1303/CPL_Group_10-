import { Container, Row, Col } from 'react-bootstrap';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';

function App() {
 
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
