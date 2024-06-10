import { createEffect, createEvent, createStore, sample } from "effector";
import { persist } from "effector-storage/local";
import { get } from "radash";

import { http } from "#/lib/http";

import { IEntity, IStore } from "../types";

export const $authStore = createStore<IStore.Store>({
  isAuthenticated: false,
  accessToken: "",
  profile: null,
});

export const setToken = createEvent<string>();
export const setProfile = createEvent<IEntity.Profile>();
export const resetStorage = createEvent();
export const refetchUser = createEvent();

$authStore.on(setToken, (state, token) => ({
  ...state,
  accessToken: token,
}));

$authStore.reset(resetStorage);

$authStore.on(setProfile, (state, profile) => ({
  ...state,
  isAuthenticated: true,
  profile,
}));

export const fetchProfileFx = createEffect(async () => {
  const { data } = await http.get("/v1/auth/me");

  return get(data, "data");
});

sample({
  clock: setToken,
  target: fetchProfileFx,
});

sample({
  clock: fetchProfileFx.doneData,
  fn: (data) =>
    ({
      _id: get(data, "_id"),
      name: get(data, "name"),
      email: get(data, "email"),
      phone: get(data, "phone"),
      address: get(data, "address"),
      country: get(data, "country"),
    }) as IEntity.Profile,
  target: setProfile,
});

sample({
  clock: refetchUser,
  source: $authStore,
  filter: (state)=>!!state.accessToken,
  target: fetchProfileFx,
});

sample({
  clock: fetchProfileFx.failData,
  target: resetStorage,
});

persist({ store: $authStore, key: "auth:storage" });
