import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { CryptoState } from "../CryptoContext";

import {
  ThemeProvider,
  Container,
  Typography,
  createTheme,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  Table,
  LinearProgress,
  makeStyles,
} from "@material-ui/core";
const CoinTable = () => {
  const { currency, symbol, coinlist, loading, fetchCoinList } = CryptoState();

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCoinList(currency);
  }, [currency]);

  const handleSearch = () => {
    return coinlist.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    );
  };

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
  });

  const classes = useStyles();
  const history = useHistory();

  const darkTheme = createTheme({
    pallete: {
      primary: { main: "#fff" },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h3" style={{ margin: 14 }}>
          Cryptocurrencies Prices by Market Cap
        </Typography>
        <TextField
          label="Search for a CryptoCurrency"
          variant="filled"
          color="secondary"
          style={{
            backgroundColor: "white",
            marginBottom: 20,
            width: "100%",
            borderRadius: 12,
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch().map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => history.push(`/coins/${row.id}`)}
                      className={classes.row}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ display: "flex", gap: 11, height: "20%" }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="45"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column", color: "whitesmoke" }}
                        >
                          <span style={{ fontSize: 22, textTransform: "uppercase" }}>
                            {row.symbol}
                          </span>
                          <span style={{ color: "gold" }}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="right" style={{ color: "whitesmoke" }}>
                        {symbol} {row.current_price}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h}%
                      </TableCell>

                      <TableCell align="right" style={{ color: "whitesmoke" }}>
                        {symbol} {row.market_cap.toString().slice(0, -6)}M
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinTable;
