import { AxiosResponse } from "axios";
import { api } from "./fetcher";

export async function getUcs() {
  return api
    .get<any>(`/`)
    .then((response: AxiosResponse<any>) => response.data);
}

export async function ucData(id: string) {
  return api
    .get<any>(`/uc/${id}`)
    .then((response: AxiosResponse<any>) => response.data);
}

export async function changeStateData(id: string, payed: boolean) {
  return api
    .put<any>(`/pdf`, { id, payed })
    .then((response: AxiosResponse<any>) => response.data);
}

export async function ucList(id: string) {
  return api
    .get<any>(`/list/${id}`)
    .then((response: AxiosResponse<any>) => response.data);
}

export async function deletePdf(id: string) {
  return api
    .delete<any>(`/pdf/${id}`)
    .then((response: AxiosResponse<any>) => response.data);
}

export async function addPdf(files: FormData) {
  return api
    .post<any>(`/pdf`, files)
    .then((response: AxiosResponse<any>) => response.data);
}
