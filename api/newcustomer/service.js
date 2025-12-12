"use client";

import axios from "axios";
import http from "../HttpServices";

// import http from "../HttpServices";
// import { apiurl } from "../Config";

export const GetNewcustomer = async () => {
  return http.get(`${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/customer/newcustomer`);
};

export const CreateNewcustomer = async (data) => {
  return await http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/customer/newcustomer`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
