"use client";

import axios from "axios";
import http from "../HttpServices";

// import http from "../HttpServices";
// import { apiurl } from "../Config";

export const GetuserList = async () => {
  return http.get(`${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Account/UserList`);
};
export const GetuserDetail = async (Id) => {
  return http.get(`${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Account/ProfileUserById/${Id}`);
};

export const GetRoleList = async () => {
  return http.get(`${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Account/RoleList`);
};

export const CreateNewcustomer = async (data) => {
  return await http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Account/newcustomer`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
export const UpdateUserRoleEdit = async (data) => {
  return await http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Account/UserRoleEdit`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
export const UpdateUser = async (data) => {
  return await http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Account/UserUpdate`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
