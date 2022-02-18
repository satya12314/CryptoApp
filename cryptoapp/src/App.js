import "./App.css";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import Coinpage from "./Pages/Coinpage";
import {
  BrowserRouter,
  Route,
  // Link
} from "react-router-dom";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "./components/Alert";
function App() {
  const useStyles = makeStyles({
    App: {
      backgroundColor: "black",
      color: "white",
      minHeight: "100vh",
    },
  });
  //create object of usestyles
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />

        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={Coinpage} exact />
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
