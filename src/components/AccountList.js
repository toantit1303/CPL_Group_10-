import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";

export default function AccountList() {
    const [acc, setAcc] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getAccount();
    }, [search]);

    const getAccount = () => {
        fetch("http://localhost:9999/accounts")
            .then(res => res.json())
            .then(result => {
                const searchResult = result.filter(a => {
                    return a.fullName && a.fullName.toLowerCase().includes(search.toLowerCase());
                });
                setAcc(searchResult);
            })
    };


    return (
        <Container fluid>
            <Row style={{ justifyContent: 'center', margin: '20px' }}>
                <Col xs={6}>
                    <Form.Control
                        type='text'
                        placeholder="Enter to search"
                        style={{ border: "1px solid black" }}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
            </Row>
            <Table className="col-12" hover striped>
                {acc.length === 0 ? (
                    <tbody>
                        <tr style={{ border: '1px solid black' }}>
                            <td colSpan={7} style={{ border: '1px solid black', textAlign: 'center' }}>No User found</td>
                        </tr>
                    </tbody>
                ) : (
                    <>
                        <thead className="text-center">
                            <tr>
                                <th style={{ border: '1px solid black' }}>Fullname</th>
                                <th style={{ border: '1px solid black' }}>Email</th>
                                <th style={{ border: '1px solid black' }}>Gender</th>
                                <th style={{ border: '1px solid black' }}>Date of Birth</th>
                                <th style={{ border: '1px solid black', width: '200px' }}>Avatar</th>
                                <th style={{ border: '1px solid black' }}>Role</th>
                                <th style={{ border: '1px solid black' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {acc.map(a => {
                                return (
                                    <tr key={a.id} style={{ border: '1px solid black' }}>
                                        <td style={{ border: '1px solid black' }}>{a.fullName}</td>
                                        <td style={{ border: '1px solid black' }}>{a.email}</td>
                                        <td style={{ border: '1px solid black', textAlign: 'center' }}>{a.gender}</td>
                                        <td style={{ border: '1px solid black', textAlign: 'center' }}>{a.dob}</td>
                                        <td style={{ border: '1px solid black', textAlign: 'center' }}>
                                            <img src={a.avatar} alt={a.Name} className="img-fluid"
                                                style={{
                                                    borderRadius: '50%',
                                                    width: '10vw',
                                                    height: '10vw',
                                                    maxWidth: '150px',
                                                    maxHeight: '150px',
                                                }}
                                            />
                                        </td>
                                        <td style={{ border: '1px solid black' }}>{a.role}</td>
                                        <td style={{ border: '1px solid black', textAlign: 'center' }}>
                                            <Link to={`#`} className="btn btn-warning">Ban</Link>{" "}
                                            <Link to={`#`} className="btn btn-danger">Delete</Link>{" "}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </>
                )}
            </Table>
        </Container>
    )
}
