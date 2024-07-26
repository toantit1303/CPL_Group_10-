import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DeleteAccount = () => {
    const { uId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        deleteAccountAndOrders();
    }, []);

    const deleteAccountAndOrders = async () => {
        await fetch(`http://localhost:9999/accounts/${uId}`, {
            method: "DELETE",
        });

        const response = await fetch("http://localhost:9999/orders");
        const allOrders = await response.json();

        const ordersToDelete = allOrders.filter(order =>
            order.userInfo.some(user => user.uId === uId)
        );
        const deleteOrderPromises = ordersToDelete.map(order =>
            fetch(`http://localhost:9999/orders/${order.id}`, {
                method: "DELETE",
            })
        );
        await Promise.all(deleteOrderPromises);

        alert("Account deleted successfully")
        navigate("/admin/accountList")
    };

    return null;
};

export default DeleteAccount;