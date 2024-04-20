import { Box, Container, Typography, Link } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "@/scenes/navbar";


const NotFoundPage = () => {
  const navigate = useNavigate();
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  return (
    <Box>
      { isAuth && <Navbar />}
      <Container>
        <Typography variant="h1">404</Typography>
        <Typography>Lo sentimos, no encontramos esta página.</Typography>
        <Link onClick={() => navigate("/")}>Ir al inicio</Link>
      </Container>
    </Box>
  )
}

export default NotFoundPage;