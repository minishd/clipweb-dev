import { jwtDecode } from "jwt-decode";
import { Claims, Clip, MiniUser } from "./api";

export type AuthStore = {
  refresh_token?: string;
  access_token?: string;
  last_refresh_time?: Date;
};

export const auth = $store<AuthStore>(
  {},
  { ident: "auth-store", backing: "localstorage", autosave: "auto" }
);

type State = {
  claimsCache?: Claims;
  userCache: Stateful<Map<number, MiniUser>>;
  clipHoverCache: Stateful<Map<number, Clip>>;
};

export const state = $state<State>({
  claimsCache: undefined,
  userCache: $state(new Map()),
  clipHoverCache: $state(new Map()),
});

useChange(auth.access_token, (tk) => {
  state.claimsCache = !!tk ? jwtDecode<Claims>(tk) : undefined;
});
