// src/index.js
import express, { Express, Request, Response } from "express";
import React from "react";
import process from "node:process";
import dotenv from "dotenv";
import Email from "./emails/template";
import { Resend } from "resend";

dotenv.config();

if (process.env.RESEND_API === undefined) {
  console.log("Please set RESEND_API");
  process.exit(1);
}

const resend = new Resend(process.env.RESEND_API);

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/email", async (req: Request, res: Response) => {
  const results = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "wschenk@gmail.com",
    subject: "Test email",
    react: <Email />,
  });

  console.log("Email sent");
  console.log(results);
  res.send("Email sent");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
