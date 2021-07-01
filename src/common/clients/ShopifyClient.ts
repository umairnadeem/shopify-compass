import { ApiClient } from "./ApiClient";

const BASE_URL = "https://bruh.loca.lt/graphql";

export class ShopifyClient extends ApiClient {
  constructor() {
    super(BASE_URL);
  }
}
