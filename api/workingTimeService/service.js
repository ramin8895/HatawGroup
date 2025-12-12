"use client";

import axios from "axios";
import http from "../HttpServices";

// import http from "../HttpServices";
// import { apiurl } from "../Config";

export const GetWorkingTime = async (id_dist) => {
  return await http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/companies/workingtime`,
    {
      params: {
        id_dist: id_dist,
      },
    }
  );
};

export const CreateWorkingTime = async (data) => {
  console.log(data);
  return await http.put(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/companies/workingtime`,
    data
  );
};
