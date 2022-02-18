import { makeStyles, Container, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";
const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    height: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography variant="h2" style={{ color: "gold", fontFamily: "Montserrat" }}>
            CRYPTO MARKET
          </Typography>

          <Typography
            className={classes.subtitle}
            variant="subtitle1"
            style={{ color: "grey", fontFamily: "Montserrat" }}
          >
            Get info of your own CryptoCurrency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
