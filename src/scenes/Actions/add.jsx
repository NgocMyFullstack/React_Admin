import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

function ProductForm() {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const coffeeData = {
        name: formData.name,
        image: formData.image,
        price: Number(formData.price),
        resId: Number(formData.resId),
      };

      // Gửi dữ liệu sản phẩm đến API bằng phương thức POST
      await fetch("http://localhost:8080/api/coffees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coffeeData), // Chuyển dữ liệu thành chuỗi JSON
      });

      // Sau khi thêm sản phẩm thành công, có thể cập nhật giao diện hoặc thực hiện các hành động khác ở đây.
      console.log("Sản phẩm đã được thêm thành công.");
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

export default ProductForm;
