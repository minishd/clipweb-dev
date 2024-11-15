import axios from "axios";

const BASE_URL = "http://127.0.0.1:8085";

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

type AuthLoginResponse = string;

export async function authLogin(
  username: string,
  password_hash_sha256: string
): Promise<string> {
  let refresh_token = await axios.post<AuthLoginResponse>(
    `${BASE_URL}/api/auth/login`,
    {
      username: username,
      password_hash_sha256: password_hash_sha256,
    }
  );

  return refresh_token.data;
}
