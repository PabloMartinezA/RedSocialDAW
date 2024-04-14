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
import { setLogin } from "@/state/auth";
import Dropzone from "react-dropzone";
import FlexBetween from "@/components/FlexBetween";
import api from "@/api";

const registerSchema = yup.object().shape({
  nombre: yup.string().required("required"),
  apellido: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contrasena: yup.string().required("required"),
  ubicacion: yup.string().required("required"),
  ocupacion: yup.string().required("required"),
  img: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  contrasena: yup.string().required("required"),
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
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // Esto nos permite enviar informacion del formulario incluyendo imagenes
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("imgRuta", values.img.name);

    const savedUser = await api(
      "/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedIn = await api("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    console.log(loggedIn);
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
        <form onSubmit={handleSubmit}>
          <Typography fontWeight="1000" variant="h1" sx={{ mb: "1.5rem" }}>
            {isLogin ? "¡Bienvenido de vuelta!" : "¡Bienvenido!"}
          </Typography>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
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
                  border={`1px solid ${palette.neutral.medium}`}
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
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.img ? (
                          <p>Agregar una imagen aqui</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.img.name}</Typography>
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

          {/* BOTONES */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "INICIAR SESION" : "REGISTRARSE"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "¿No eres parte de nuestra comunidad? Registrate."
                : "¿Ya tienes una cuenta? Inicia sesion aqui."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
