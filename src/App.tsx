import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Grid, Typography } from "@material-ui/core";

import { v4 as uuidv4 } from "uuid";

const ENDPOINT = "https://api.bitbay.net/rest/trading/";
const defaultCodeList = ["BTC-PLN"];

function App() {
  const [data, setData] = useState<any>({});
  const [limit, setLimit] = useState(3);
  const [counter, setCounter] = useState(0);

  const [codesList, setCodesList] = useState<any>(defaultCodeList);
  const [codeListIndex, setCodeListIndex] = useState(0);

  const [code1, code2] = codesList[codeListIndex].split("-");
  const { status, sell, buy, secNo, timestamp } = data;

  // initial api call
  useEffect(() => {
    axios
      .get(`${ENDPOINT}orderbook/${code1}-${code2}`)
      .then((res) => {
        setData(res.data);
        setCounter((prevCounter) => prevCounter + 1);
      })
      .catch((err) => setData(err));

    // get currency codes list
    axios.get(`${ENDPOINT}ticker`).then((res) => {
      setCodesList([...defaultCodeList, ...Object.keys(res.data.items)]);
    });
    // .catch((err) => setData(err));
  }, [code1, code2]);

  // update list as soon as data are back from api
  // useEffect(() => {
  //   axios
  //        .get(`${ENDPOINT}orderbook/${code1}-${code2}`)
  //     .then((res) => {
  //       setData(res.data);
  //       setCounter((prevCounter) => prevCounter + 1);
  //     })
  //     .catch((err) => setData(err));
  // }, [counter,codeListIndex]);

  // update list every 5sek data are back from api
  useEffect(() => {
    if (counter === 0) return;

    let interval: ReturnType<typeof setInterval>;

    interval = setInterval(() => {
      console.log("call");
      axios
        .get(`${ENDPOINT}orderbook/${code1}-${code2}`)
        .then((res) => {
          setData(res.data);
          setCounter((prevCounter) => prevCounter + 1);
        })
        .catch((err) => setData(err));
    }, 5000);

    return () => clearInterval(interval);
  }, [counter, codeListIndex]);

  return (
    <React.Fragment>
      <CssBaseline />

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(codesList, null, 2)}</pre> */}

      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom component="h1" align="center">
              OrderBook
            </Typography>

            <Grid container spacing={2}>
              {[
                `${code1}-${code2}`,
                "Spread : 234234234",
                "24h: max, 24h: min",
              ].map((x) => (
                <Grid item xs={4}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    component="h2"
                    align="center"
                  >
                    {x}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom component="h3" align="center">
              Sell
            </Typography>
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
                      <p>
                        AMOUNT <strong>{code1}</strong>
                      </p>
                      {ca}
                    </div>
                    <div>
                      <p>
                        Price <strong>{code2}</strong>
                      </p>
                      {(ra * ca).toFixed(2)} <strong>{code2}</strong>
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
            <Typography variant="h6" gutterBottom component="h3" align="center">
              Buy
            </Typography>
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
                      <p>
                        AMOUNT <strong>{code1}</strong>
                      </p>
                      {ca}
                    </div>
                    <div>
                      <p>
                        Price <strong>{code2}</strong>
                      </p>
                      {(ra * ca).toFixed(2)} <strong>{code2}</strong>
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
