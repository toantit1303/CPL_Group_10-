import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import BanAccount from "./BanAccount";
import Categories from './ExtraMenu'

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
            });
    };

    const handleToggleBan = async (id, currentBanStatus) => {
        const updatedBanStatus = !currentBanStatus;
        await fetch(`http://localhost:9999/accounts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ban: updatedBanStatus }),
        });

        getAccount();
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
            <Row>
                <Col md={2} >
                    <Categories data={Categories} />
                </Col>
                <Col md={10}>

                    <Table className="col-12" >
                        {acc.length === 0 ? (
                            <tbody>
                                <tr >
                                    <td colSpan={7} >No User found</td>
                                </tr>
                            </tbody>
                        ) : (
                            <>
                                <thead className="text-center">
                                    <tr>
                                        <th style={{ backgroundColor: "blue", color: "white" }}>Fullname</th>
                                        <th style={{ backgroundColor: "blue", color: "white" }}>Email</th>
                                        <th style={{ backgroundColor: "blue", color: "white" }}>Gender</th>
                                        <th style={{ backgroundColor: "blue", color: "white" }}>Date of Birth</th>
                                        <th style={{ backgroundColor: "blue", color: "white", width: '200px' }}>Avatar</th>
                                        <th style={{ backgroundColor: "blue", color: "white" }}>Role</th>
                                        <th style={{ backgroundColor: "blue", color: "white" }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {acc.map(a => {
                                        return (
                                            <tr key={a.id} >
                                                <td style={{ textAlign: 'center' }}>{a.fullName}</td>
                                                <td style={{ textAlign: 'center' }}>{a.email}</td>
                                                <td style={{ textAlign: 'center' }}>{a.gender}</td>
                                                <td style={{ textAlign: 'center' }}>{a.dob}</td>
                                                <td style={{ textAlign: 'center' }}>
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
                                                <td >{a.role}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    {a.role !== "admin" && (
                                                        <>
                                                            <BanAccount id={a.id} ban={a.ban} onToggle={handleToggleBan} />
                                                            <Link style={{ marginLeft: "50px" }} to={`/admin/account/delete/${a.id}`} className="btn btn-danger">Delete</Link>
                                                        </>
                                                    ) || (
                                                            <h6>this is admin account</h6>
                                                        )}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </>
                        )}
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
