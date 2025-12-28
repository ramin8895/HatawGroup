"use client";

import axios from "axios";
import http from "../HttpServices";

// import http from "../HttpServices";
// import { apiurl } from "../Config";

export const GetLangList = async () => {
  return http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Language/LanguageList`
  );
};
export const GetLangGetById = async (id?: number) => {
  return http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Language/LanguageGetById/${id}`
  );
};
export const DeleteLangGetById = async (id?: number) => {
  return http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Language/LanguageDelete/${id}`
  );
};

export const Createlang = async (data: {
  id: number;
  titleLanguage: string;
  orderLang: number;
}) => {
  return await http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Language/LanguageAdd
`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
export const UpdateLang = async (
  id: any,
  data: {
    id: number;
    titleLanguage: string;
    orderLang: number;
  }
) => {
  return await http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Language/LanguageUpdate/${id}
`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
