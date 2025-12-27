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
export const GetEventGetById = async (id?: number) => {
  return http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Events/EventGetById/${id}`
  );
};

export const GetEventActiveEventsBymode = async () => {
  const res = await http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Events/ActiveEventsBymode`
  );

  return res.data; // 👈 فقط دیتا
};

export const CreateEvents = async (data: EventType) => {
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
export const CreateEventsScore = async (data: any) => {
  return await http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/EventScore/EventScoreAdd
`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const GetEventScoreGetById = async (id?: number) => {
  return http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/EventScore/ScoreByEventId/${id}`
  );
};

export const UpdateEvents = async (data: EventType) => {
  return await http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Events/EventUpdate
`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
export const DeleteEvents = async (id?: number) => {
  return await http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Events/EventDelete/${id}`
  );
};
