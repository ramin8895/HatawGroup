"use client";

import axios from "axios";
import http from "../HttpServices";

// import http from "../HttpServices";
// import { apiurl } from "../Config";

export const GetEventUser = async (id:any): Promise<EventType[]> => {
  const res = await http.get<EventType[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Eventuser/UserEvents`
  );

  return res.data; // 👈 فقط دیتا
};
