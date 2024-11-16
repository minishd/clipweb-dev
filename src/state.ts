import { jwtDecode } from "jwt-decode";
import { Claims } from "./api";

export type AuthStore = {
  refresh_token?: string;
  access_token?: string;
  last_refresh_time?: Date;
};

export const auth = $store<AuthStore>(
  {},
  { ident: "auth-store", backing: "localstorage", autosave: "auto" }
);

type UserCached = {};
type ClipCached = {};

type State = {
  claimsCache?: Claims;
  userCache: Stateful<{
    [key: number]: UserCached;
  }>;
  clipHoverCache: Stateful<{
    [key: string]: ClipCached;
  }>;
};

export const state = $state<State>({
  claimsCache: undefined,
  userCache: $state({}),
  clipHoverCache: $state({}),
});

useChange(auth.access_token, (tk) => {
  state.claimsCache = !!tk ? jwtDecode<Claims>(tk) : undefined;
});
