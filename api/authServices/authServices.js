import axios from "axios";
import http from "../HttpServices";

export const LoginUser = async (body) => {
  try {
    console.log("sdsd");
    const response = await http.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Account/LoginRegister`,
      body
    );
    return response;
  } catch (error) {
    console.error("LoginUser error:", error);
    throw error;
  }
};
