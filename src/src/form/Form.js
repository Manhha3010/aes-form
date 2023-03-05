import { Box, Button, Container, Grid, Input, Stack } from "@mui/material";
import React, { useState } from "react";
import Aes from "../aes/aes";
import FormDecrypt from "./FormDecrypt";
import FormEncrypt from "./FormEncrypt";
const AES = require("../aes/aes-ctr");

const Form = () => {
  const [text, setText] = useState("");
  const [screen, setScreen] = useState("encrypt");
  const [values, setValues] = useState("");
  const [encrptedData, setEncrptedData] = useState(null);
  const [decrptedData, setDecrptedData] = useState(null);

  return (
    <>
      <Container sx={{ maxWidth: "900px" }}>
        <Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ margin: "1.5rem 0" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6}>
                <FormEncrypt
                  encrptedData={encrptedData}
                  setEncrptedData={setEncrptedData}
                />
                {/* <Box sx={{ display: "inline-block", marginTop: "2rem" }}>
                  {JSON.stringify(encrptedData)}
                </Box> */}
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormDecrypt
                  decrptedData={decrptedData}
                  setDecrptedData={setDecrptedData}
                />
                {/* <Box sx={{ display: "inline-block", marginTop: "5rem" }}>
                  {JSON.stringify(decrptedData)}
                </Box> */}
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Form;
