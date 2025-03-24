import axios from "axios";
import host from "../utils/host";

import { Local } from "./Local";
import { RingCreateSchema } from "../types/ring";

export class RingService {
  static async createRing(ring: RingCreateSchema) {
    const url = `${host()}/ring`;

    const JWT = await Local.get("JWT");

    try {
      const response = await (
        await this.getAxiosInstance()
      ).post(url, ring, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JWT,
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
        error: "Erro ao cadastrar o Anel.",
        success: false,
      };
    }
  }

  static async updateRing(ring: RingCreateSchema, ringId: string) {
    const url = `${host()}/ring/${ringId}`;

    const JWT = await Local.get("JWT");

    try {
      const response = await (
        await this.getAxiosInstance()
      ).put(url, ring, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JWT,
          accept: "*/*",
        },
      });
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
        error: "Erro ao cadastrar o Anel.",
        success: false,
      };
    }
  }

  static async deleteRing(ringId: string) {
    const url = `${host()}/ring/${ringId}`;

    const JWT = await Local.get("JWT");

    try {
      const response = await (
        await this.getAxiosInstance()
      ).delete(url, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JWT,
          accept: "*/*",
        },
      });
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
        error: "Erro ao deletar o Anel.",
        success: false,
      };
    }
  }

  static async getRings() {
    const url = `${host()}/ring`;

    const JWT = await Local.get("JWT");

    try {
      const response = await (
        await this.getAxiosInstance()
      ).get(url, {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
          "Access-Control-Allow-Origin": "*",
          "x-access-token": JWT,
        },
      });

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
        error: "Erro ao buscar os Anéis.",
        success: false,
      };
    }
  }

  static async deleteProduct(ringId: string) {
    const url = `${host()}/ring/${ringId}`;
    try {
      const response = await (await this.getAxiosInstance()).delete(url);
      if (response.status === 200) {
        return { success: true };
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
        error: "Erro ao deletar o Anel",
        success: false,
      };
    }
  }

  static async switchProductStatus(ringId: string) {
    const url = `${host()}/ring/${ringId}`;
    try {
      const response = await (
        await this.getAxiosInstance()
      ).patch(url, {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      });
      if (response.status === 200) {
        return { success: true };
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
        error: "Erro ao editar o Anel.",
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
      },
    });
  }
}
