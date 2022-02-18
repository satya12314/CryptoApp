import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { TrendingCoins } from "../config/api.js";
import { CryptoState } from "../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
// export function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }
const Carousel = () => {
  const [trending, settrending] = useState([]);
  const useStyles = makeStyles(() => ({
    carouseItem: {
      height: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "white",
    },
  }));
  const classes = useStyles();
  const { currency, symbol } = CryptoState();
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    settrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 5,
    },
  };
  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.carouseItem} to={`/coins/${coin.id}`}>
        <img src={coin?.image} alt={coin.name} height="80" style={{ marginBottom: 10 }} />
        <span>
          {coin?.symbol}
          &nbsp;
          <span style={{ color: profit > 0 ? "rgb(14,203,129)" : "red", fontWeight: 500 }}>
            {profit && "+"}
            {coin?.price_change_percentage_24h.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {coin?.current_price.toFixed(2)}
        </span>
      </Link>
    );
  });
  return (
    <div className={classes.carouseItem}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
