"use client";

import axios from "axios";
import http from "../HttpServices";

// import http from "../HttpServices";
// import { apiurl } from "../Config";

export const GetEventUser = async (id: any) => {
  return http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Eventuser/UserEvents?userId=${id}`
  );
};

export const AddEventUser = async (data: { codeEvent: string }) => {
  return http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Eventuser/EventuserAdd`,
    data
  );
};