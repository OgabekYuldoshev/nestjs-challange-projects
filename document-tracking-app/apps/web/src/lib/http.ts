import axios from "axios"

import { $authStore } from "#/modules/auth/context/store";

export const http = axios.create()

http.interceptors.request.use(axiosConfig => {
    const state = $authStore.getState();
  
    if (state.accessToken) {
      axiosConfig.headers.Authorization = `Bearer ${state.accessToken}`;
    }
  
    return axiosConfig;
  });
  