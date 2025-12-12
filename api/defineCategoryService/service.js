"use client";

import axios from "axios";
import http from "../HttpServices";

// import http from "../HttpServices";
// import { apiurl } from "../Config";

export const GetDefineCategory = async () => {
  return http.get(`${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/categories`);
};

export const CreateDefineCategory = async (data) => {
  return await http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/categories`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
