import axios, { Axios } from "axios";
import { auth } from "../state";
import { JwtPayload } from "jwt-decode";

export const BASE_URL = "http://localhost:8085";

type ClipsSearchResponse = {
  authors: {
    username: string;
  }[];
  clips: {
    title: string;
    author_id: number;
    num_views: string;
  }[];
};

export interface Claims extends JwtPayload {
  id: number;
  username: string;
}

type AuthRefreshResponse = {
  refresh_token?: string;
  access_token: string;
};

type AuthLoginResponse = string;

export class ApiClient {
  axios: Axios;

  constructor() {
    this.axios = axios.create({
      baseURL: BASE_URL,
    });
  }

  token(refresh = false) {
    const token = refresh ? auth.refresh_token : auth.access_token;

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  async refresh(full: boolean) {
    if (!auth.refresh_token)
      throw new Error("can't refresh without an access token");

    let response = await this.axios.get<AuthRefreshResponse>(
      "/api/auth/refresh",
      {
        params: {
          full: full,
        },
        ...this.token(true),
      }
    );
    const data = response.data;

    auth.access_token = data.access_token;

    if (data.refresh_token) {
      auth.refresh_token = data.refresh_token;
      auth.last_refresh_time = new Date();
    }
  }

  async login(username: string, password_hash_sha256: string) {
    let response = await this.axios.post<AuthLoginResponse>("/api/auth/login", {
      username: username,
      password_hash_sha256: password_hash_sha256,
    });

    auth.refresh_token = response.data;
    this.refresh(false);
  }

  async register(
    username: string,
    password_hash_sha256: string,
    registration_invite_key: string
  ) {
    let response = await this.axios.post("/api/auth/register", {
      username: username,
      password_hash_sha256: password_hash_sha256,
      registration_invite_key: registration_invite_key,
    });

    auth.refresh_token = response.data;
  }
}

export const api = new ApiClient();
