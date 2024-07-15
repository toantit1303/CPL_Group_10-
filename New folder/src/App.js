import { Container, Row, Col } from 'react-bootstrap';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import SignIn from './components/SignIn';


function App() {

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Container fluid >
      <Row>
        <Header/>
      </Row>
      <Row>
        <Col>
          <BrowserRouter>
            <Row>
              <Col>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/auth/Sign-in" element={<SignIn />} />
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