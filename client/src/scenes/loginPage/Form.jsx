import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { Palette } from "@mui/icons-material";

const registerSchema = yup.object().shape({
  nombre: yup.string().required("El nombre es requerido"),
  apellido: yup.string().required("El apellido es requerido"),
  email: yup.string().email("email invalido").required("El email es requerido"),
  contrasena: yup.string().required("La contrasena es requerida"),
  ubicacion: yup.string().required("La ubicacion es requerida"),
  ocupacion: yup.string().required("La ocupacion es requerida"),
  img: yup.string().required("Se requiere una imagen"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("email invalido").required("El email es requerido"),
  contrasena: yup.string().required("La contrasena es requerida"),
});

const initialValuesRegister = {
  nombre: "",
  apellido: "",
  email: "",
  contrasena: "",
  ubicacion: "",
  ocupacion: "",
  img: "",
};

const initialValuesLogin = {
  email: "",
  contrasena: "",
};

const Form = () => {
  const { pageType, setPageType } = useState("login");
  const { pallete } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // Esto permite enviar informacion del formulario con imagen
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("imgRuta", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubtmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > dix": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="Nombre"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nombre}
                  name="nombre"
                  error={Boolean(touched.nombre) && Boolean(errors.nombre)}
                  helperText={touched.nombre && errors.nombre}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Apellido"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.apellido}
                  name="apellido"
                  error={Boolean(touched.apellido) && Boolean(errors.apellido)}
                  helperText={touched.apellido && errors.apellido}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Ubicacion"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ubicacion}
                  name="ubicacion"
                  error={
                    Boolean(touched.ubicacion) && Boolean(errors.ubicacion)
                  }
                  helperText={touched.ubicacion && errors.ubicacion}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Ocupacion"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ocupacion}
                  name="ocupacion"
                  error={
                    Boolean(touched.ocupacion) && Boolean(errors.ocupacion)
                  }
                  helperText={touched.ocupacion && errors.ocupacion}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${pallete.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("img", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${Palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.img ? (
                          <p>Agregar Img Aqui</p>
                        ) : (
                          <FlexBetween>
                            <Typography> {values.img.name} </Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Contrasena"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.contrasena}
              name="contrasena"
              error={Boolean(touched.contrasena) && Boolean(errors.contrasena)}
              helperText={touched.contrasena && errors.contrasena}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* Botones */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: pallete.primary.main,
                color: pallete.background.alt,
                "&:hover": { color: pallete.primary.main },
              }}
            >
              {isLogin ? "Iniciar Sesion" : "Registrarse"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "Registrarse" : "Iniciar Sesion");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: pallete.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: pallete.primary.light,
                },
              }}
            >
              {isLogin
                ? "No tienes cuenta? Registrate aqui"
                : "Ya tienes cuenta? Inicia Sesion aqui"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
