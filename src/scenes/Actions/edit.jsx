import { Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductEdit() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: 0,
    resId: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Fetch the product data by its ID and populate the form
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/coffees/${id}`);
        if (response.ok) {
          const productData = await response.json();
          setFormData({
            name: productData.name,
            image: productData.image,
            price: productData.price,
            resId: productData.restaurant.id,
          });
        } else {
          console.error("Lỗi lấy dữ liệu sản phẩm.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedCoffeeData = {
        name: formData.name,
        image: formData.image,
        price: Number(formData.price),
        restaurant: {
          id: Number(formData.resId),
        },
      };

      await fetch(`http://localhost:8080/api/coffees/${id}`, {
        method: "PUT", // Sử dụng PUT để cập nhật sản phẩm
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCoffeeData),
      });

      console.log("Sản phẩm đã được cập nhật thành công.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        margin: "auto",
        maxWidth: "70%",
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
        label="Product name"
        variant="outlined"
      />

      <TextField
        type="text"
        id="image"
        name="image"
        value={formData.image}
        onChange={handleInputChange}
        required
        label="Image"
        variant="outlined"
      />

      <TextField
        type="number"
        id="price"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        required
        label="Price"
        variant="outlined"
      />

      <TextField
        type="number"
        id="resId"
        name="resId"
        value={formData.resId}
        onChange={handleInputChange}
        required
        label="Res Id"
        variant="outlined"
      />

      <Button type="submit" variant="contained" color="secondary">
        Submit
      </Button>
    </Box>
  );
}

export default ProductEdit;
