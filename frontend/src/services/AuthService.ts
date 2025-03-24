import axios from "axios";
import host from "../utils/host";

import { SignInVariables, SignUpVariables } from "../types/auth";
import { Local } from "./Local";

export class AuthService {
  static async signUp(user: SignUpVariables) {
    const url = `${host()}/auth/signup`;
    try {
      const response = await axios.post(url, user, {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      });

      if (response.status === 201) {
        return { data: response.data, success: true };
      } else {
        return {
          error: response.data.message,
          success: false,
        };
      }

    } catch (error: any) {
      if (error.response.data.error)
        return {
          error: error.response.data.error,
          success: false,
        };

      return {
        error: "Erro ao cadastrar usuário",
        success: false,
      };
    }
  }

  static async signIn(singIn: SignInVariables) {
    const url = `${host()}/auth/signin`;

    try {
      const response = await axios.post(url, singIn);

      if (response.status === 200) {
        return { data: response.data, success: true };
      } else {
        return {
          error: response.data.message,
          success: false,
        };
      }

    } catch (error: any) {
      if (error.response.data.error)
        return {
          error: error.response.data.error,
          success: false,
        };

      return {
        error: "Erro ao logar usuário",
        success: false,
      };
    }
  }

  static async checkJWT() {
    const url = `/checkJWT`;
    try {
      const response = await (await this.getAxiosInstance()).get(url);

      if (response.status === 200) {
        return { data: response.data, success: true };
      } else {
        return {
          error: response.data.message,
          success: false,
        };
      }
      
    } catch (error: any) {
      console.log(error);
      if (error.response.data.error)
        return {
          error: error.response.data.error,
          success: false,
        };

      return {
        error: "Erro ao verificar token",
        success: false,
      };
    }
  }

  static async getAxiosInstance() {
    const jwt = await Local.get("JWT");

    return axios.create({
      baseURL: `${host()}`,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": jwt,
        accept: "*/*",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
