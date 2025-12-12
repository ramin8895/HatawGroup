"use client";
import axios from "axios";
import http from "../HttpServices";
export const PutUpdateUser = async (data) => {
  return http.put(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/profile/dist`,
    data
  );
};

export const PutUpdateUserIamge = async (formData) => {
  console.log(formData, "formData");
  return http.put(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/uploadimage`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
export const PutImageHeader = async (formData) => {
  console.log(formData, "formData");
  return http.put(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/uploadimage/dist`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const GetUser = async (id) => {
  // if (!id || isNaN(Number(id))) {
  //   throw new Error("Valid numeric ID is required");
  // }
  const response = await http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/companies/companies/${id}`
  );
  return response.data;
};
