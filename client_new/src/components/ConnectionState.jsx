import { Typography } from "@mui/material";

const ConnectionState = ({ isConnected }) => {
  return (
    <Typography>State: { '' + isConnected }</Typography>
  );
}
export default ConnectionState;