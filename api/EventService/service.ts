"use client";

import axios from "axios";
import http from "../HttpServices";

// import http from "../HttpServices";
// import { apiurl } from "../Config";

export const GetEvents = async (): Promise<EventType[]> => {
  const res = await http.get<EventType[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Events/EventList`
  );

  return res.data; // 👈 فقط دیتا
};

export const CreateEvents = async (data:EventType) => {
  return await http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Events/EventAdd
`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
