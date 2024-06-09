import { AxiosPromise } from "axios";

import { http } from "#/lib/http";

import { IApi, IForm } from "./types";

export const LoginApi = ({ values }: { values: IForm.LoginForm }): AxiosPromise<IApi.Login.Res> => http.post("/v1/auth/login", values)

export const LogOutApi = () => http.post("/v1/auth/logout")
