import { useParams } from "react-router-dom";

export default function ProductDelete() {
    const { pId } = useParams();

    const deleteProduct = (pId) => {
        fetch(`http://localhost:9999/products/${pId}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(result => {
                alert("Product deleted successfully");
                window.location.href = "/admin/products";
            })
    }

    deleteProduct(pId);

    return (
        <div></div>
    )
}



