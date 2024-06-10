import { useUnit } from "effector-react";

import { $authStore, fetchProfileFx, refetchUser, resetStorage } from "./store";

export const useAuth = () =>
  useUnit({
    store: $authStore,
    isLoading: fetchProfileFx.pending,
    reset: resetStorage,
    refetch: refetchUser,
  });
