import "isomorphic-fetch";
import { DocumentNode, gql } from "apollo-boost";
import { Context } from "koa";

export function ONETIME_CREATE(url: string): DocumentNode {
  return gql`
    mutation {
      appPurchaseOneTimeCreate(
        name: "test"
        price: { amount: 10, currencyCode: USD }
        returnUrl: "${url}"
        test: true
      ) {
        userErrors {
          field
          message
        }
        confirmationUrl
        appPurchaseOneTime {
          id
        }
      }
    }
  `;
}

export const getOneTimeUrl = async (ctx: Context): Promise<any> => {
  const { client } = ctx;
  const confirmationUrl = await client
    .mutate({
      mutation: ONETIME_CREATE(process.env.HOST),
    })
    .then((response) => response.data.appPurchaseOneTimeCreate.confirmationUrl);
  return ctx.redirect(confirmationUrl);
};
