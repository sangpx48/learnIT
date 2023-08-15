import React from "react";
import Alert from "@mui/material/Alert";

const AlertMessage = ({ info }) => {
  return info === null ? null : (
    <Alert variant="filled" severity="warning">
      {info.message}
    </Alert>
  );
};

export default AlertMessage;
