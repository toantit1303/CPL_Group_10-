import { Col, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function Categories({ data = [] }) {

    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user && user.role === 'admin';

    return (
        <Col>
            {isAdmin ? (
                <Table  bordered >
                    <thead>
                        <tr>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Link style={{textDecoration:"none"}} to="/admin/products">Products</Link></td>
                        </tr>
                        <tr>
                            <td><Link style={{textDecoration:"none"}} to="/admin/accountList">Account List</Link></td>
                        </tr>
                        <tr>
                            <td><Link style={{textDecoration:"none"}} to="/admin/category/add">Manage Categories</Link></td>
                        </tr>
                    </tbody>
                </Table>
            ) : (
                <Table  bordered   >
                    <thead>
                        <tr>
                            <th>Categories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(c => (
                            <tr key={c.id}>
                                <td><Link style={{textDecoration:"none"}} to={`/product/category/${c.id}`}>{c?.catName}</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    );
}
