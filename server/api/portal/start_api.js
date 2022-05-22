const express = require("express");
const router = express.Router();
const sql_command = require("../../api/utils/sql_command");
const {
  jsonFormatSuccess,
//   jsonFormatError,
} = require("../../api/utils/format_json");

  router.get("/test-get-start", async (req, res, next) => {
    req.params
    try {
      let results = await sql_command.query(`SELECT * FROM PERSONAL`);
      res.json(jsonFormatSuccess(results));
    } catch (error) {
      next(error);
    }
  });

  router.get("/test-get/:idedit", async (req, res, next) => {
    console.log(req.params.idedit)
    try {
      let results = await sql_command.query(`SELECT * FROM PERSONAL WHERE ID=${req.params.idedit};`);
      return res.json(jsonFormatSuccess(results));
    } catch (error) {
      next(error);
    }
  });
  
  router.post("/insert-get-start",  async (req, res, next) => {
    // console.log(req)
    const body = req.body
    console.log(body)
    try {
      let results = await sql_command.query(`INSERT INTO PERSONAL(NAME,AGE,SEX,PHONE,EMAIL)
      VALUES('${body.name}','${body.age}','${body.sex}','${body.phone}','${body.email}')`);
      res.json(jsonFormatSuccess(results));
    } catch (error) {
      next(error);
    }
  });
  
  router.put("/test-put/fe",  async (req, res, next) => {
    // const body = req.body
    // console.log(body)
    try {
      let results = await sql_command.query(`UPDATE PERSONAL
      SET LNAME = 'BUNPUN' 
      WHERE id = 14;`);
      res.json(jsonFormatSuccess(results));
    } catch (error) {
      next(error);
    }
  });
  router.put("/test-put",  async (req, res, next) => {
    const body = req.body
    console.log(body)
    try {
      let results = await sql_command.query(`UPDATE PERSONAL
      SET NAME = '${body.name}' ,AGE = '${body.age}',SEX = '${body.sex}' ,PHONE = '${body.phone}',EMAIL = '${body.email}'
      WHERE ID = ${body.id};`);
      res.json(jsonFormatSuccess(results));
    } catch (error) {
      next(error);
    }
  });
  
  router.delete("/test-delete/:id",  async (req, res, next) => {
    // req.params
    console.log(req.params.id)
    try {
      let results = await sql_command.query(`DELETE FROM PERSONAL WHERE ID = ${req.params.id};` );
      res.json(jsonFormatSuccess(results));
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = router;