import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { CoinList } from "./config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setcurrency] = useState("INR");
  const [symbol, setsymbol] = useState("₹");
  const [coinlist, setCoinList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [watchlist, setWatchlist] = useState([]);
  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          // console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      console.log(user);
    });
  }, []);

  const fetchCoinList = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    // console.log(data);
    setCoinList(data);
    setLoading(false);
  };
  // console.log(coinlist);
  useEffect(() => {
    if (currency === "INR") setsymbol("₹");
    else if (currency === "USD") setsymbol("$");
  }, [currency]);
  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setcurrency,
        coinlist,
        loading,
        fetchCoinList,
        alert,
        setAlert,
        user,
        watchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;
export const CryptoState = () => {
  return useContext(Crypto);
};
