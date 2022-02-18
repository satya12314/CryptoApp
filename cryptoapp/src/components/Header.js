import React from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from "@material-ui/core";
import { createTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";
const useStyle = makeStyles(() => ({
  title: { flex: 1, color: "gold", fontWeight: "bold", cursor: "pointer" },
}));

const Header = () => {
  const classes = useStyle();
  let history = useHistory();

  const { currency, setcurrency, user } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="primary" position="static">
        <Container>
          <Toolbar>
            <Typography onClick={() => history.push("/")} className={classes.title} variant="h6">
              Crypto Market
            </Typography>
            <Select
              variant="outlined"
              style={{ color: "white", width: 100, height: 40, marginRight: 15 }}
              value={currency}
              onChange={(e) => setcurrency(e.target.value)}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
