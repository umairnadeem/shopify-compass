import React, { ReactElement } from "react";
import { Query, useQuery } from "react-apollo";
import { mapOrderList } from "../../../common/mappers/orderListMapper";
import { ShopifyOrderListGQL } from "../../../common/models/ShopifyOrder";
import { GET_ORDERS } from "../../../common/queries";
import WithLoader from "../../WithLoader/WithLoader";

const OrderList: React.FC = (): ReactElement => {
  const { loading, data } = useQuery<ShopifyOrderListGQL>(GET_ORDERS);
  return (
    <WithLoader loading={loading}>
    <>
    {JSON.stringify(mapOrderList(data))}
    </>
  </WithLoader>
  )
};

export default OrderList;