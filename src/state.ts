type AuthStore = {
  refresh_token?: string;
};

export const auth = $store<AuthStore>(
  {},
  { ident: "auth-store", backing: "localstorage", autosave: "auto" }
);

type UserCached = {};

type UserCacheState = {
  [key: number]: UserCached;
};

export const userCache = $state<UserCacheState>({});

type ClipCached = {};

type OneshotClipCacheState = {
  [key: number]: ClipCached;
};

export const oneshotClipCache = $state<OneshotClipCacheState>({});
