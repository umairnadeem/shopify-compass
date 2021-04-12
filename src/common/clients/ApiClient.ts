import axios, {
  AxiosRequestConfig,
  AxiosBasicCredentials,
  AxiosInstance,
  AxiosResponse,
} from "axios";
import * as Qs from "qs";

export interface ApiClientConfig extends AxiosRequestConfig {
  baseURL: string;

  // Both parameters need to be set to enable basic auth.
  basicAuthUser?: string;
  basicAuthPassword?: string;
}

export class ApiClient {
  private baseUrl: string;
  private basicAuth?: AxiosBasicCredentials;
  private axios: AxiosInstance;

  constructor(baseUrlOrCfg: string | ApiClientConfig) {
    if (typeof baseUrlOrCfg === "string") {
      this.baseUrl = baseUrlOrCfg;
      this.axios = axios.create();
    } else {
      const config = baseUrlOrCfg;
      if (baseUrlOrCfg.basicAuthUser && baseUrlOrCfg.basicAuthPassword) {
        this.withBasicAuth(
          baseUrlOrCfg.basicAuthUser,
          baseUrlOrCfg.basicAuthPassword
        );
      }
      this.baseUrl = config.baseURL;
      this.axios = axios.create(config);
    }
  }

  public withBasicAuth(username: string, password: string): ApiClient {
    this.basicAuth = { username, password };
    return this;
  }

  protected async getBatch<Z>(
    path: string,
    query?: Record<string, unknown>
  ): Promise<{ [id: string]: Z }> {
    return this.request({
      url: path,
      params: query,
      paramsSerializer(params) {
        return Qs.stringify(params, { arrayFormat: "repeat" });
      },
    }).then((res) => res.data);
  }

  protected async get<Z>(
    path: string,
    query?: Record<string, unknown>
  ): Promise<Z> {
    return this.request({
      url: path,
      params: query,
      paramsSerializer(params) {
        return Qs.stringify(params, { arrayFormat: "repeat" });
      },
    }).then((res) => res.data);
  }

  protected async post<Z, Y>(
    path: string,
    body: Z,
    query?: Record<string, unknown>
  ): Promise<Y> {
    return this.request({
      url: path,
      method: "POST",
      data: body,
      params: query,
      paramsSerializer(params) {
        return Qs.stringify(params, { arrayFormat: "repeat" });
      },
    }).then((res) => res.data);
  }

  protected async patch<Z, Y = undefined>(
    path: string,
    body: Z,
    query?: Record<string, unknown>
  ): Promise<Y> {
    return this.request({
      url: path,
      method: "PATCH",
      data: body,
      params: query,
      paramsSerializer(params) {
        return Qs.stringify(params, { arrayFormat: "repeat" });
      },
    }).then((res) => res.data);
  }

  protected async put<Z, Y>(
    path: string,
    body: Z,
    query?: Record<string, unknown>
  ): Promise<Y> {
    return this.request({
      url: path,
      method: "PUT",
      data: body,
      params: query,
      paramsSerializer(params) {
        return Qs.stringify(params, { arrayFormat: "repeat" });
      },
    }).then((res) => res.data);
  }

  protected async delete<Z>(
    path: string,
    query?: Record<string, unknown>,
    body?: Record<string, unknown>
  ): Promise<Z> {
    return this.request({
      url: path,
      method: "DELETE",
      data: body,
      params: query,
      paramsSerializer(params) {
        return Qs.stringify(params, { arrayFormat: "repeat" });
      },
    }).then((res) => res.data);
  }

  protected async request(
    requestConfig: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this.axios.request({
      baseURL: this.baseUrl,
      auth: this.basicAuth,
      ...requestConfig,
    });
  }

  protected async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
  }
}
