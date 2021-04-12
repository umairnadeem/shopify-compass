import { AxiosRequestConfig } from "axios";
import { Rule } from "../../components/GlobalOrderRouter/Rules/Rule";
import { ApiClient } from "./ApiClient";

const GLOBAL_ORDER_ROUTER_URL =
  process.env.GLOBAL_ORDER_ROUTER_URL || "http://localhost:3000";

export class GlobalOrderRouterClient extends ApiClient {
  constructor(config: AxiosRequestConfig = {}) {
    super({
      ...config,
      baseURL: `${config.baseURL || GLOBAL_ORDER_ROUTER_URL}/v1`,
    });
  }

  public async getRules(storeName: string): Promise<Rule[]> {
    await this.delay(5000);
    return [{ name: "bruh" }, { name: "bruh2" }, { name: storeName }];
  }
}
