import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

export default function AboutUs() {

    return (
        <Row style={{ padding: '0', margin: '30px auto' }}>
            <Row>
                <h1 style={{ textAlign: 'center' }}>Meet SV team developer</h1>
                <h6 style={{ textAlign: 'center', color: '#27A4F2' }}>PROFESSIONAL LEVEL</h6>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <Container>
                    <Row xs={1} sm={2} md={4} className="g-4" style={{ display: 'flex', padding: '0' }}>
                        <Col className="md-3" >
                            <div className="card" style={{ height: '100%', textAlign: 'center', margin: ' auto', boxShadow:"2px 2px 2px 2px gray" }}>
                                <img src={"../assets/toan2.png"} className="card-img-top" alt="..."
                                    style={{
                                        borderRadius: '50%',
                                        width: '50vw',
                                        height: '50vw',
                                        maxWidth: '280px',
                                        maxHeight: '280px',
                                        objectFit: 'contain',
                                        margin: ' auto',
                                        marginTop: '50px'
                                    }}
                                />
                                <div className="card-body" style={{ padding: '20px', width: '300px', margin: '0 auto', textAlign: 'center' }}>
                                    <h3 className="card-title" style={{ fontSize: '1.4em', marginBottom: '10px' }}>Bùi Khánh Toàn</h3>
                                    <h5 className="card-title" style={{ fontSize: '1.0em', color: '#27A4F2', marginBottom: '10px' }}>Leader</h5>
                                    <div className="card-title" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-twitter"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-skype"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3a9 9 0 0 1 8.603 11.65a4.5 4.5 0 0 1 -5.953 5.953a9 9 0 0 1 -11.253 -11.253a4.5 4.5 0 0 1 5.953 -5.954a8.987 8.987 0 0 1 2.65 -.396z" /><path d="M8 14.5c.5 2 2.358 2.5 4 2.5c2.905 0 4 -1.187 4 -2.5c0 -1.503 -1.927 -2.5 -4 -2.5s-4 -1 -4 -2.5c0 -1.313 1.095 -2.5 4 -2.5c1.642 0 3.5 .5 4 2.5" /></svg>
                                    </div>
                                    <p className="card-text" style={{ textAlign: 'center', fontSize: '1.0em' }}> A passionate and dedicated Leader. With extensive experience in software development, he has led his team to impressive achievements.</p>
                                </div>
                            </div>
                        </Col>
                        <Col className="md-3" >
                            <div className="card" style={{ height: '100%', textAlign: 'center', margin: ' auto', boxShadow:"2px 2px 2px 2px gray"  }}>
                                <img src={"../assets/anh2.png"} className="card-img-top" alt="..."
                                    style={{
                                        borderRadius: '50%',
                                        width: '50vw',
                                        height: '50vw',
                                        maxWidth: '280px',
                                        maxHeight: '280px',
                                        objectFit: 'contain',
                                        margin: ' auto',
                                        marginTop: '50px'
                                    }}
                                />
                                <div className="card-body" style={{ padding: '20px', width: '300px', margin: '0 auto', textAlign: 'center' }}>
                                    <h3 className="card-title" style={{ fontSize: '1.4em', marginBottom: '10px' }}>Trịnh Nguyễn Ngọc Anh</h3>
                                    <h5 className="card-title" style={{ fontSize: '1.0em', color: '#27A4F2', marginBottom: '10px' }}>Designer</h5>
                                    <div className="card-title" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-twitter"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-skype"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3a9 9 0 0 1 8.603 11.65a4.5 4.5 0 0 1 -5.953 5.953a9 9 0 0 1 -11.253 -11.253a4.5 4.5 0 0 1 5.953 -5.954a8.987 8.987 0 0 1 2.65 -.396z" /><path d="M8 14.5c.5 2 2.358 2.5 4 2.5c2.905 0 4 -1.187 4 -2.5c0 -1.503 -1.927 -2.5 -4 -2.5s-4 -1 -4 -2.5c0 -1.313 1.095 -2.5 4 -2.5c1.642 0 3.5 .5 4 2.5" /></svg>
                                    </div>
                                    <p className="card-text" style={{ textAlign: 'center', fontSize: '1.0em' }}>Brings creativity and innovation to every project. His eye for detail and unique vision consistently deliver exceptional results.</p>
                                </div>
                            </div>
                        </Col>
                        <Col className="md-3" >
                            <div className="card" style={{ height: '100%', textAlign: 'center', margin: ' auto', boxShadow:"2px 2px 2px 2px gray"  }}>
                                <img src={"../assets/linh.png"} className="card-img-top" alt="..."
                                    style={{
                                        borderRadius: '50%',
                                        width: '50vw',
                                        height: '50vw',
                                        maxWidth: '280px',
                                        maxHeight: '280px',
                                        objectFit: 'contain',
                                        margin: ' auto',
                                        marginTop: '50px'
                                    }}
                                />
                                <div className="card-body" style={{ padding: '20px', width: '300px', margin: '0 auto', textAlign: 'center' }}>
                                    <h3 className="card-title" style={{ fontSize: '1.4em', marginBottom: '10px' }}>Nguyễn Đức Linh</h3>
                                    <h5 className="card-title" style={{ fontSize: '1.0em', color: '#27A4F2', marginBottom: '10px' }}>Main developer</h5>
                                    <div className="card-title" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-twitter"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-skype"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3a9 9 0 0 1 8.603 11.65a4.5 4.5 0 0 1 -5.953 5.953a9 9 0 0 1 -11.253 -11.253a4.5 4.5 0 0 1 5.953 -5.954a8.987 8.987 0 0 1 2.65 -.396z" /><path d="M8 14.5c.5 2 2.358 2.5 4 2.5c2.905 0 4 -1.187 4 -2.5c0 -1.503 -1.927 -2.5 -4 -2.5s-4 -1 -4 -2.5c0 -1.313 1.095 -2.5 4 -2.5c1.642 0 3.5 .5 4 2.5" /></svg>
                                    </div>
                                    <p className="card-text" style={{ textAlign: 'center', fontSize: '1.0em' }}>A leading Main Developer, excels with his deep technical expertise and innovative approach. His strategic vision and commitment drive exceptional outcomes and elevate every project to new heights.</p>
                                </div>
                            </div>
                        </Col>
                        <Col className="md-3" >
                            <div className="card" style={{ height: '100%', textAlign: 'center', margin: ' auto', boxShadow:"2px 2px 2px 2px gray"  }}>
                                <img src={"../assets/tung.png"} className="card-img-top" alt="..."
                                    style={{
                                        borderRadius: '50%',
                                        width: '50vw',
                                        height: '50vw',
                                        maxWidth: '280px',
                                        maxHeight: '280px',
                                        objectFit: 'contain',
                                        margin: ' auto',
                                        marginTop: '50px'
                                    }}
                                />
                                <div className="card-body" style={{ padding: '20px', width: '300px', margin: '0 auto', textAlign: 'center' }}>
                                    <h3 className="card-title" style={{ fontSize: '1.4em', marginBottom: '10px' }}>Nguyễn Việt Tùng</h3>
                                    <h5 className="card-title" style={{ fontSize: '1.0em', color: '#27A4F2', marginBottom: '10px' }}>Tester</h5>
                                    <div className="card-title" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-twitter"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-skype"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3a9 9 0 0 1 8.603 11.65a4.5 4.5 0 0 1 -5.953 5.953a9 9 0 0 1 -11.253 -11.253a4.5 4.5 0 0 1 5.953 -5.954a8.987 8.987 0 0 1 2.65 -.396z" /><path d="M8 14.5c.5 2 2.358 2.5 4 2.5c2.905 0 4 -1.187 4 -2.5c0 -1.503 -1.927 -2.5 -4 -2.5s-4 -1 -4 -2.5c0 -1.313 1.095 -2.5 4 -2.5c1.642 0 3.5 .5 4 2.5" /></svg>
                                    </div>
                                    <p className="card-text" style={{ textAlign: 'center', fontSize: '1.0em' }}>  An exceptional Tester, ensures software quality with meticulous attention to detail and a keen analytical mind. He thorough testing and insightful feedback enhance reliability and performance in every project.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>


                </Container>
            </Row >
        </Row >
    )
}
