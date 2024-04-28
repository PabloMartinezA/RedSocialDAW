import { Box } from "@mui/material";
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
    try {
      const response = await fetch("http://localhost:3001/usuarios/", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
      } else {
        console.error("Error al obtener usuarios:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    getUsuarios();
  }, [token]);

  return (
    <Box>
      <Navbar />
      <DataTable tableName={"Usuarios"} columns={columns} rows={usuarios} />
    </Box>
  );
};

export default AdminPage;
