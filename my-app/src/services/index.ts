import { AxiosRequestConfig } from "axios";
import { apiInstance } from "../utils/api/AxiosInstance";
import { fetchWithJSON } from "../utils/api/fetch";

export type HousePayload = {
  id: number;
  houseNumber: string;
  checked: 1 | 0;
  isEmpty: 1 | 0;
  allowed: 1 | 0;
}

export const getHouses = async (): Promise<HousePayload[]> => {
  const requestConfig: AxiosRequestConfig = {
    url: '/exec?action=getHouse',
    method: 'GET',
  };
  return fetchWithJSON(apiInstance, requestConfig);
}


export const addHouses = async (request: HousePayload) => {
  const requestConfig: AxiosRequestConfig = {
    url: '/exec?action=addHouse',
    method: 'POST',
    data: request,
  };
  return fetchWithJSON(apiInstance, requestConfig);
}

export const editHouse = async (request: HousePayload) => {
  const requestConfig: AxiosRequestConfig = {
    url: '/exec?action=editHouse',
    method: 'POST',
    data: request,
    headers: {
      "Content-Type": "application/json",
    },

  };
  return fetchWithJSON(apiInstance, requestConfig);
}

export const toggleCheckHouse = async (id: number) => {
  const requestConfig: AxiosRequestConfig = {
    url: `/exec?action=toggleCheckHouse&id=${id}`,
    method: 'GET',
  };
  return fetchWithJSON(apiInstance, requestConfig);
}

export const toggleEmptyHouse = async (id: number) => {
  const requestConfig: AxiosRequestConfig = {
    url: `/exec?action=toggleEmptyHouse&id=${id}`,
    method: 'GET',
  };
  return fetchWithJSON(apiInstance, requestConfig);
}

export const toggleAllowedHouse = async (id: number) => {
  const requestConfig: AxiosRequestConfig = {
    url: `/exec?action=toggleAllowedHouse&id=${id}`,
    method: 'GET',
  };
  return fetchWithJSON(apiInstance, requestConfig);
}
