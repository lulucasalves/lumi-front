import { AxiosResponse } from "axios";
import { api } from "./fetcher";

export async function getUcsAndYears() {
  return api
    .get<unknown>(`/`)
    .then((response: AxiosResponse<unknown>) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export async function ucData(id: string, year: string) {
  return api
    .get<unknown>(`/uc/${id}/${year}`)
    .then((response: AxiosResponse<unknown>) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export async function changeStateData(id: string, payed: boolean) {
  return api
    .put<unknown>(`/pdf`, { id, payed })
    .then((response: AxiosResponse<unknown>) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export async function ucList(id: string, year: string) {
  return api
    .get<unknown>(`/list/${id}/${year}`)
    .then((response: AxiosResponse<unknown>) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export async function deletePdf(id: string) {
  return api
    .delete<unknown>(`/pdf/${id}`)
    .then((response: AxiosResponse<unknown>) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export async function addPdf(files: FormData) {
  return api
    .post<unknown>(`/pdf`, files)
    .then((response: AxiosResponse<unknown>) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}
