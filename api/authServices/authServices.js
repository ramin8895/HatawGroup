import axios from "axios";
import http from "../HttpServices";

export const LoginByUsername = async (body) => {
  try {
    console.log("Url ====>" + process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD);
    const response = await http.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Account/LoginRegisterUsername`,
      body
    );
    return response;
  } catch (error) {
    console.error("LoginUser error:", error);
    throw error;
  }
};
