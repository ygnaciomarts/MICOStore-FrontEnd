

import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import { authFetch } from "../../util/authFetch";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const data = await authFetch("/api/products");
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleOpen = (product = null) => {
        setSelectedProduct(product || {
            name: "",
            description: "",
            price: "",
            stock: "",
            category: "",
            imageUrl: ""
        });
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedProduct(null);
        setOpen(false);
    };

    const handleChange = (e) => {
        setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const method = selectedProduct.id ? "PUT" : "POST";
        const url = selectedProduct.id
            ? `/api/products/${selectedProduct.id}`
            : `/api/products`;
        await authFetch(url, {
            method,
            body: JSON.stringify(selectedProduct),
        });
        fetchProducts();
        handleClose();
    };

    const handleDelete = async (id) => {
        await authFetch(`/api/products/${id}`, {
            method: "DELETE",
        });
        fetchProducts();
    };

    return (
        <div style={{ padding: "2rem" }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#fff', marginBottom: '20px', fontWeight: 'bold' }}>
                Admin Products
            </Typography>
            <Button variant="contained" onClick={() => handleOpen()}>Add Product</Button>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleOpen(product)}>Edit</Button>
                                    <Button color="error" onClick={() => handleDelete(product.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedProduct?.id ? "Edit Product" : "Add Product"}</DialogTitle>
                <DialogContent>
                    <TextField label="Name" name="name" value={selectedProduct?.name || ""} onChange={handleChange} fullWidth margin="dense" />
                    <TextField label="Description" name="description" value={selectedProduct?.description || ""} onChange={handleChange} fullWidth margin="dense" />
                    <TextField label="Price" name="price" type="number" value={selectedProduct?.price || ""} onChange={handleChange} fullWidth margin="dense" />
                    <TextField label="Stock" name="stock" type="number" value={selectedProduct?.stock || ""} onChange={handleChange} fullWidth margin="dense" />
                    <TextField label="Category" name="category" value={selectedProduct?.category || ""} onChange={handleChange} fullWidth margin="dense" />
                    <TextField label="Image URL" name="imageUrl" value={selectedProduct?.imageUrl || ""} onChange={handleChange} fullWidth margin="dense" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminProducts;