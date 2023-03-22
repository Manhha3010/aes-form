import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import Readmore from "../common/Readmore";
const AES = require("../aes/aes-ctr");

const FormDecrypt = (props) => {
  const { decrptedData, setDecrptedData } = props;

  const initialValues = {
    cipher: "",
    password: "",
    keyLength: "",
  };

  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  const validationSchema = Yup.object({
    cipher: Yup.string().nullable().required("Cipher is required"),
    password: Yup.string().nullable().required("Password is required"),
    keyLength: Yup.string()
      .nullable()
      .required("keyLength is required")
      .max(3, "Số nhập vào không vượt quá 3 chữ số")
      .matches(/(^128)|(^192)|(^256)$/, "Độ dài khóa không hợp lệ"),
  });

  const handleSubmit = async (values, formik) => {
    const start = Date.now();

    let cipher = values?.cipher;
    let password = values?.password;
    let keyLength = values?.keyLength;
    const plaintext = await AES.decrypt(cipher, password, keyLength);

    const end = Date.now();

    const result = {
      cipher,
      plaintext,
      password,
      keyLength,
      time: (end - start) / 1 + "ms",
    };
    setDecrptedData(result);
    formik.resetForm();
  };

  return (
    <>
      <Box sx={{ marginBottom: "2rem" }}>FormDecrypt</Box>
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
                  id="cipher"
                  name="cipher"
                  label="Cipher"
                  placeholder="Enter cipher"
                  value={formik.values.cipher}
                  onChange={formik.handleChange}
                  error={formik.touched.cipher && Boolean(formik.errors.cipher)}
                  helperText={formik.touched.cipher && formik.errors.cipher}
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
                  label="Length"
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
                  Decrypt
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
                <Readmore text={decrptedData?.cipher} />
              </TableCell>
              <TableCell>
                <Readmore text={decrptedData?.plaintext} />
              </TableCell>
              <TableCell>{decrptedData?.password}</TableCell>
              <TableCell>{decrptedData?.keyLength}</TableCell>
              <TableCell>{decrptedData?.time}</TableCell>
            </TableRow>
          </TableBody>
        </TableContainer>
      </Box>
    </>
  );
};

export default FormDecrypt;
