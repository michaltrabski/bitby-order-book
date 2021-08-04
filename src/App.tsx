import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";

const ENDPOINT = "https://api.bitbay.net/rest/trading/orderbook/BTC-PLN";

function App() {
  console.log(1);
  const [data, setData] = useState<any>({});
  const [limit, setLimit] = useState(3);
  // const [counter, setCounter] = useState(0);

  const { status, sell, buy, secNo, timestamp } = data;

  // useEffect(() => {
  //   axios
  //     .get(ENDPOINT)
  //     .then((res) => {
  //       console.log(2);
  //       setData(res.data);
  //     })
  //     .catch((err) => setData(err));
  // }, [data]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    interval = setInterval(() => {
      console.log("call");
      axios
        .get(ENDPOINT)
        .then((res) => {
          setData(res.data);
          // setLimit((p) => p + 1);
        })
        .catch((err) => setData(err));
    }, 100000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            Title
          </Grid>

          <Grid item xs={6}>
            Sell
            {sell &&
              sell.slice(0, limit).map((item: any, i: number) => {
                const { ra, ca, co } = item;
                return (
                  <Box
                    key={i}
                    sx={{
                      mb: 8,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {/* EXCHANGE RATE AMOUNT BTC PRICE USD */}
                    <div>
                      <p>EXCHANGE RATE</p>
                      {ra}
                    </div>
                    <div>
                      <p>AMOUNT BTC</p>
                      {ca}
                    </div>
                    <div>
                      <p>Price PLN</p>
                      {(ra * ca).toFixed(2)} PLN
                    </div>
                    <div>
                      <p>Ilość ofert</p>
                      {co}
                    </div>
                  </Box>
                );
              })}
          </Grid>
          <Grid item xs={6}>
            Buy
            {buy &&
              buy.slice(0, limit).map((item: any, i: number) => {
                const { ra, ca, co } = item;
                return (
                  <Box
                    key={i}
                    sx={{
                      mb: 8,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {/* EXCHANGE RATE AMOUNT BTC PRICE USD */}
                    <div>
                      <p>EXCHANGE RATE</p>
                      {ra}
                    </div>
                    <div>
                      <p>AMOUNT BTC</p>
                      {ca}
                    </div>
                    <div>
                      <p>Price PLN</p>
                      {(ra * ca).toFixed(2)} PLN
                    </div>
                    <div>
                      <p>Ilość ofert</p>
                      {co}
                    </div>
                  </Box>
                );
              })}
          </Grid>
        </Grid>

        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </Container>
    </React.Fragment>
  );
}

export default App;

// Klucz	Typ	Opis
// sell / buy	array
// * ra	decimal	Kurs pozycji.
// * ca	decimal	Obecna ilość kryptowaluty w pozycji.
// * sa	decimal	Początkowa ilość kryptowaluty w pozycji.
// * pa	decimal	Ilość kryptowaluty w pozycji przed ostatnią zmianą.
// * co	integer	Ilość ofert na którą składa się pozycja.
// timestamp	Unix Timestamp	Czas dla jakiego wszystkie powyżej wartości są aktualne.
// seqNo	integer	Numer sekwencyjny. Pozwala zachować kolejność otrzymywanych danych.
