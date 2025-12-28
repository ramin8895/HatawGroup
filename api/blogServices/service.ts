"use client";

import axios from "axios";

// import http from "../HttpServices";
// import { apiurl } from "../Config";
import http from "../HttpServices";

export const GetBlogList = async () => {
  return await http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/HatawBlog/HatawBlogList`,
  
  );
};
export const CreateBlog = async (data:any) => {
  console.log(data, "data");
  return await http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/HatawBlog/BlogAdd`,
    data
  );
};

export const UploadBlogImage = async ({ id, file }: { id: number; file: File }) => {
  const formData = new FormData();
  formData.append("featured_image", file); // نام فیلد دقیقا مشابه مستندات (featured_image)

  return await http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/HatawBlog/BlogImage/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const GetBlogById = async (id: number) => {
  return await http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/HatawBlog/HatawBlogGetById/${id}`
  );
};
// export const CreateWorkingTime = async (data) => {
//   console.log(data);
//   return await axios.put(
//     `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/companies/workingtime`,
//     data
//   );
// };
