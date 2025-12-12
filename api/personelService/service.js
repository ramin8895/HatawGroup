"use client";

import axios from "axios";

import http from "../HttpServices";
// import { apiurl } from "../Config";

export const CreatePersonel = async (title) => {
  return http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/personel`,
    title
  );
};

export const GetPersonel = async (data) => {
  console.log(data);
  return await http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/personel`,
    {
      params: {
        id_dist: data,
      },
    }
  );
};
export const GetShiftPersonel = async (data) => {
  console.log(data);
  return await http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/personel/shiftpersonel`,
    {
      params: {
        id_personel: data,
      },
    }
  );
};

export const UpdatePersonel = async (data) => {
  return await http.put(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/personel`
  );
};
export const UpdateShiftPersonel = async (data) => {
  return await http.put(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/personel/shiftpersonel`,
    data
  );
};

export const DeletePersonel = async (data) => {
  return await http.delete(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/personel`,
    {
      params: {
        data,
      },
    }
  );
};
