import React, { useState, useEffect } from "react";

const ProductView = ({ match }) => {
  const [product, setProduct] = useState(null);

  // Giả sử bạn có một hàm hoặc API để lấy chi tiết sản phẩm dựa trên ID.
  const fetchProductDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/view-product/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        console.error("Lỗi khi lấy thông tin sản phẩm");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin sản phẩm:", error);
    }
  };

  useEffect(() => {
    // Truyền ID sản phẩm từ Route Params vào để lấy chi tiết sản phẩm.
    const id = match.params.id;
    fetchProductDetails(id);
  }, [match.params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img
        src={product.image}
        alt={product.name}
        style={{ maxWidth: "300px" }}
      />
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      <p>Category: {product.category}</p>
      <p>Rating: {product.rating}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
};

export default ProductView;
