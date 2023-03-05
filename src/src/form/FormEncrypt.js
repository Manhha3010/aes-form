import {
  Box,
  Button,
  Grid,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import Readmore from "../common/Readmore";
const AES = require("../aes/aes-ctr");

const FormEncrypt = (props) => {
  const { encrptedData, setEncrptedData } = props;
  const exceptThisSymbols = ["e", "E", "+", "-", "."];
  const initialValues = {
    text: "",
    password: "",
    keyLength: "",
  };

  const validationSchema = Yup.object({
    text: Yup.string().nullable().required("Text is required"),
    password: Yup.string().nullable().required("Password is required"),
    keyLength: Yup.string()
      .nullable()
      .required("keyLength is required")
      .max(3, "Số nhập vào không vượt quá 3 chữ số")
      .matches(/(^128)|(^192)|(^256)$/, "Nhập vào không hợp lệ"),
  });

  const handleSubmit = async (values, formik) => {
    let plaintext = values?.text;
    let password = values?.password;
    let keyLength = values?.keyLength;
    const cipher = await AES.encrypt(plaintext, password, keyLength);
    const start = Date.now();
    const end = Date.now();
    const result = {
      cipher,
      plaintext,
      password,
      keyLength,
      time: (end - start) / 1000 + "s",
    };
    setEncrptedData(result);
    formik.resetForm({
      values: { text: "", password: "", keyLength: "" },
    });
  };
  return (
    <>
      <Box sx={{ marginBottom: "2rem" }}>FormEncrypt</Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        enableReinitialize={true}
        validateOnChange={true}
      >
        {(formik) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  id="text"
                  name="text"
                  label="Text"
                  placeholder="Enter Plain Text"
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  error={formik.touched.text && Boolean(formik.errors.text)}
                  helperText={formik.touched.text && formik.errors.text}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="Enter key"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  id="keyLength"
                  name="keyLength"
                  label="keyLength"
                  placeholder="Enter key length 128/192/256"
                  value={formik.values.keyLength}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.keyLength && Boolean(formik.errors.keyLength)
                  }
                  helperText={
                    formik.touched.keyLength && formik.errors.keyLength
                  }
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 999 } }}
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              justifyContent="center"
              sx={{ marginTop: "2rem" }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{
                  justifyContent: "center",
                }}
              >
                <Button type="submit" variant="contained">
                  Encrypt
                </Button>
              </Stack>
            </Grid>
          </Form>
        )}
      </Formik>
      <Box>
        <TableContainer component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell>ciper</TableCell>
              <TableCell>plaintext</TableCell>
              <TableCell>password</TableCell>
              <TableCell>keyLength</TableCell>
              <TableCell>time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Readmore text={encrptedData?.cipher} />
              </TableCell>
              <TableCell>
                <Readmore text={encrptedData?.plaintext} />
              </TableCell>
              <TableCell>{encrptedData?.password}</TableCell>
              <TableCell>{encrptedData?.keyLength}</TableCell>
              <TableCell>{encrptedData?.time}</TableCell>
            </TableRow>
          </TableBody>
        </TableContainer>
      </Box>
    </>
  );
};

export default FormEncrypt;
