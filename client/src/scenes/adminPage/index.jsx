import { Box, Typography } from "@mui/material";
// import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DataTable from "@/components/DataTable";
import Navbar from "@/scenes/navbar";
import api from "@/api";

const columns = [
  { id: '_id', numeric: false, disablePadding: false, label: 'ID', },
  { id: 'nombre', numeric: false, disablePadding: false, label: 'Nombre', },
  { id: 'apellido', numeric: false, disablePadding: false, label: 'Apellido', },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email', },
  { id: 'imgRuta', numeric: false, disablePadding: false, label: 'Imagen', },
  { id: 'ubicacion', numeric: false, disablePadding: false, label: 'Ubicación', },
  { id: 'ocupacion', numeric: false, disablePadding: false, label: 'Ocupación', },
  { id: 'vistasPerfil', numeric: true, disablePadding: false, label: 'Vistas', },
  { id: 'impresiones', numeric: true, disablePadding: false, label: 'Impresiones', },
];

const AdminPage = () => {
  const token = useSelector((state) => state.auth.token);
  const [usuarios, setUsuarios] = useState([]);

  const getUsuarios = async () => {
    const data = await api("/usuarios/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (data) { setUsuarios(data) };
  }


  useEffect(() => {
    getUsuarios();
  }, [])


  return (
    <Box>
      <Navbar />
      <DataTable tableName={"Usuarios"} columns={columns} rows={usuarios} />
    </Box>
  );
}

export default AdminPage;