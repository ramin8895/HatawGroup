"use client";

import axios from "axios";
import http from "../HttpServices";

// import http from "../HttpServices";
// import { apiurl } from "../Config";

export const CreateServiceList = async (title) => {
  return http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/serviceList`,
    title
  );
};

export const GetServiceList = async (data) => {
  console.log(data);
  return await http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/serviceList`,
    {
      params: {
        id_dist: data,
      },
    }
  );
};

export const UpdateServiceList = async (data) => {
  return await http.put(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/serviceList`
  );
};

// service sub
export const GetSubServiceList = async (data) => {
  console.log(data);
  return await http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/serviceList/subService`,
    {
      params: {
        id_dist: data.id_dist,
        code_service: data.code_service,
      },
    }
  );
};
export const CreateSubServiceList = async (formData) => {
  return await http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/serviceList/subService`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
export const DeleteServiceList = async (data) => {
  console.log(data, "datatatatattttttttttttttttt");
  return await http.delete(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/serviceList`,
    { params: { codeService: data.codeService, id_dist: data.id_dist } }
  );
};
