import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Button, Grid, Typography } from "@material-ui/core";
import MyCard, { SellBuy } from "./components/MyCard";
import { v4 as uuidv4 } from "uuid";
import MySelect from "./components/MySelect";

const ENDPOINT = "https://api.bitbay.net/rest/trading/";

export type CodesList = string[];
const defaultCodeList: CodesList = ["BTC-PLN"];

interface OrderBook {
  status: string;
  sell: SellBuy[];
  buy: SellBuy[];
  timestamp: number;
  seqNo: number;
}
function App() {
  const [data, setData] = useState<OrderBook>();
  const [limit, setLimit] = useState(10);
  const [counter, setCounter] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  console.log("call counter", counter);

  const [codesList, setCodesList] = useState(defaultCodeList);
  const [code, setCode] = useState(defaultCodeList[0]);

  // const code = codesList[codeListIndex];

  const sell = data?.sell;
  const buy = data?.buy;

  // initial api call
  useEffect(() => {
    axios
      .get<OrderBook>(`${ENDPOINT}orderbook/${code}`)
      .then((res) => {
        setData(res.data);
        setCounter((prevCounter) => prevCounter + 1);
        setDataLoaded(true);
      })
      .catch((err) => setData(err));

    // get currency codes list
    axios.get(`${ENDPOINT}ticker`).then((res) => {
      setCodesList(Object.keys(res.data.items));
    });
    // .catch((err) => setData(err));
  }, [code]);

  // update list as soon as data are back from api
  // useEffect(() => {
  //   axios
  //     .get<OrderBook>(`${ENDPOINT}orderbook/${code}`)
  //     .then((res) => {
  //       setData(res.data);
  //       setCounter((prevCounter) => prevCounter + 1);
  //     })
  //     .catch((err) => setData(err));
  // }, [counter, code]);

  // update list every 2sek data are back from api
  useEffect(() => {
    if (counter === 0) return;

    let interval: ReturnType<typeof setInterval>;

    interval = setInterval(() => {
      axios
        .get<OrderBook>(`${ENDPOINT}orderbook/${code}`)
        .then((res) => {
          setData(res.data);
          setCounter((prevCounter) => prevCounter + 1);
        })
        .catch((err) => setData(err));
    }, 2000);

    return () => clearInterval(interval);
  }, [counter, code]);

  const changeCode = (newCode: string) => {
    setDataLoaded(false);
    setCode(newCode);
  };
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
              <Grid item xs={12} md={4}>
                <Typography
                  variant="h5"
                  gutterBottom
                  component="h2"
                  align="center"
                >
                  <MySelect
                    code={code}
                    codesList={codesList}
                    changeCode={changeCode}
                  />
                </Typography>
              </Grid>
              {["Spread : 123456.78", "24h: max, 24h: min"].map((x) => (
                <Grid item xs={12} md={4}>
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

          {!dataLoaded ? (
            <Grid item xs={12}>
              <Typography
                variant="h6"
                gutterBottom
                component="h3"
                align="center"
              >
                Loading Data ...
              </Typography>
            </Grid>
          ) : (
            <>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="h3"
                  align="center"
                >
                  Sell
                </Typography>
                {sell &&
                  sell.slice(0, limit).map((data, i: number) => (
                    <Box
                      key={i}
                      sx={{
                        mb: 1,
                      }}
                    >
                      <MyCard data={data} />
                    </Box>
                  ))}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="h3"
                  align="center"
                >
                  Buy
                </Typography>
                {buy &&
                  buy.slice(0, limit).map((data, i: number) => (
                    <Box
                      key={i}
                      sx={{
                        mb: 1,
                      }}
                    >
                      <MyCard data={data} />
                    </Box>
                  ))}
              </Grid>
            </>
          )}
        </Grid>
        {dataLoaded && (
          <Box sx={{ mb: 5 }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => setLimit((p) => p + 10)}
            >
              Show more
            </Button>
          </Box>
        )}
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
