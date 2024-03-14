import { enqueueSnackbar } from 'notistack';

export function info(message) {
  enqueueSnackbar(message, { variant: "info" });
}

export function success(message) {
  enqueueSnackbar(message, { variant: "success" });
}

export function warning(message) {
  enqueueSnackbar(message, { variant: "warning" });
}

export function error(err) {
  if (process.env.NODE_ENV === "development") {
    enqueueSnackbar(err.message, { variant: "error" });
  } else {
    enqueueSnackbar("Un error ha ocurrido", { variant: "error" });
  }
}