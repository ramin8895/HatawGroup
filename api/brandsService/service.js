"use client";

import axios from "axios";
import http from "../HttpServices";

// import http from "../HttpServices";
// import { apiurl } from "../Config";

export const Getbrands = async () => {
  return http.get(`${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/brands`);
};

export const Createbrands = async (data) => {
  return await http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/brands`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
