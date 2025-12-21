"use client";

import axios from "axios";
import http from "../HttpServices";

// import http from "../HttpServices";
// import { apiurl } from "../Config";

export const GetCategory = async () => {
  return http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/HatawBlog/CategoryList`
  );
};
export const DeleteCategory = async (id) => {
  return http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/HatawBlog/CategoryDelete/${id}`
  );
};

export const CreateCategory = async (data) => {
  return await http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/HatawBlog/CategoryAdd`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
export const CreateUpdate = async (data) => {
  return await http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/HatawBlog/CategoryUpdate`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
