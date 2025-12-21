"use client";

import axios from "axios";

// import http from "../HttpServices";
// import { apiurl } from "../Config";
import http from "../HttpServices";

export const GetBlogList = async (data) => {
  console.log(data);
  return await http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/HatawBlog/HatawBlogList`,
    {
      params: {
        id_dist: data.id_dist,
        date: data.date,
      },
    }
  );
};
export const CreateBlog = async (data) => {
  console.log(data, "data");
  return await http.put(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/HatawBlog/BlogAdd`,
    data
  );
};

// export const CreateWorkingTime = async (data) => {
//   console.log(data);
//   return await axios.put(
//     `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/companies/workingtime`,
//     data
//   );
// };
