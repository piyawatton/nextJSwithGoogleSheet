import { AxiosInstance, AxiosRequestConfig } from 'axios';
import ServerFormData from 'form-data';

/**
 * Call API with submit form apporach that support both server side and client side.
 *
 * @param requester instace of axios include base config to call API
 * @param config additional axios cofigurations
 * @param form the object that represent as form data
 * @returns response data with specific type as Generic
 */
export async function fetchWithFormData<T = unknown>(
  requester: AxiosInstance,
  config: AxiosRequestConfig,
  form?: { [key: string]: any; },
): Promise<T> {
  let requestData = config.data;
  let requestHeaders;
  /* istanbul ignore if  */ // NOTE : Because of lack of test env
  if (form) {
    const isClient = typeof window !== 'undefined';
    requestData = isClient ? new FormData() : new ServerFormData();
    Object.entries(form).forEach((item) => requestData.append(
      item[0] || '',
      item[1] != null ? item[1] : '', // to prevent only null & undefined...
    ));
    const formHeaders = isClient ? {} : requestData.getHeaders();
    requestHeaders = { ...config.headers, ...formHeaders };
  }
  const requestConfig = {
    ...config,
    headers: { ...requestHeaders },
    data: requestData,
  };

  const response = await requester.request<T>(requestConfig);
  return response.data;
}

/**
 * Request api with json payload
 *
 * @param requester instace of axios include base config to call API
 * @param config additional axios cofigurations
 * @param jsonData the object that represent as json data object
 * @returns response data with specific type as Generic
 */
export async function fetchWithJSON<T = unknown>(
  requester: AxiosInstance,
  config: AxiosRequestConfig,
  jsonData?: { [key: string]: any; },
): Promise<T> {
  const requestData = jsonData || config.data;
  const requestConfig = {
    ...config,
    data: requestData,
  };

  const response = await requester.request(requestConfig);
  return response.data;
}
