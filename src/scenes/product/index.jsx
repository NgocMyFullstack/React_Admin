import { useEffect, useState } from "react";

import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Product = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fretchData = async () => {
      const result = await fetch("http://localhost:8080/api/coffees");
      const jsonResult = await result.json();

      setData(jsonResult);
    };
    fretchData();
  }, []);

  const navigate = useNavigate();

  const handleView = (id) => {
    console.log(`Xem chi tiết sản phẩm có ID ${id}`);
    navigate(`/view-product/${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Xóa sản phẩm có ID ${id}`);

    fetch(`http://localhost:8080/api/coffees/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Xóa sản phẩm thành công.");
        } else {
          console.error("Lỗi xóa sản phẩm.");
        }
      })
      .catch((error) => {
        console.error("Lỗi kết nối đến API:", error);
      });
  };

  const handleEdit = (id) => {
    console.log(`Sửa sản phẩm có ID ${id}`);
    navigate(`/edit-product/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "Image",
      headerName: "image",
      renderCell: ({ row }) => {
        return (
          <Box display="flex">
            <img
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "4px",
                margin: "5px",
              }}
              src={row.image}
              alt="Coffees"
            />
          </Box>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <Box display="flex">
            <IconButton
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: colors.greenAccent[600],
                borderRadius: "4px",
                margin: "5px",
              }}
              color="primary"
              onClick={() => handleView(row.id)}
            >
              <VisibilitySharpIcon />
            </IconButton>

            <IconButton
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#FF9966",
                borderRadius: "4px",
                margin: "5px",
              }}
              color="default"
              onClick={() => handleEdit(row.id)}
            >
              <EditRoundedIcon />
            </IconButton>
            <IconButton
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: colors.redAccent[600],
                borderRadius: "4px",
                margin: "5px",
              }}
              color="default"
              onClick={() => handleDelete(row.id)}
            >
              <DeleteRoundedIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Sản Phẩm" subtitle="Tất cả sản phẩm đang có " />
      <Link to="/add-product">
        <IconButton
          style={{
            top: "-20px",
            left: "90%",
            width: "90px",
            height: "40px",
            backgroundColor: "#66FF66",
            borderRadius: "4px",
            margin: "5px",
            fontSize: "16px",
          }}
          color="default"
        >
          Add
        </IconButton>
      </Link>

      <Box
        m="0 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default Product;
