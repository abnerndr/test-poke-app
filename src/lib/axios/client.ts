import { getBaseURL } from "../constants/env";
import { AxiosHttpAdapter } from "./http.adapter";

export const httpAdapter = new AxiosHttpAdapter(getBaseURL());
