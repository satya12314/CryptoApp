import React from "react";
import { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import { CryptoState } from "../../CryptoContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { async } from "@firebase/util";
const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = CryptoState();
  const handleSubmit = async () => {
    if (!password || !email) {
      setAlert({ open: true, message: "password don't match", type: "error" });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      setAlert({
        open: true,
        message: `Login successfully. Welcome "${result.user.email}`,
        type: "success",
      });
      console.log(result.user.message);
      handleClose();
    } catch (error) {
      setAlert({ open: true, message: error.message, type: "error" });
    }
  };
  return (
    <Box p={3} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <TextField
        variant="outlined"
        type="email"
        label="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        variant="outlined"
        type="password"
        label="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "gold" }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
