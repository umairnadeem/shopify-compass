import { IndexTable, TextStyle, useIndexResourceState, SkeletonPage, Layout, Card, SkeletonBodyText, SkeletonDisplayText, TextContainer } from "@shopify/polaris";
import React, { ReactElement } from "react";
import { useQuery } from "react-apollo";
import { useBulkQuery } from "../../../common/hooks/useBulkQuery";
import { mapOrderList } from "../../../common/mappers/orderListMapper";
import { ShopifyOrderListGQL } from "../../../common/models/ShopifyOrder";
import { getOrders } from "../../../common/queries/getOrders";
import WithLoader from "../../WithLoader/WithLoader";

const skeleton = <SkeletonPage primaryAction secondaryActions={2}>
<Layout>
  <Layout.Section>
    <Card sectioned>
      <SkeletonBodyText />
    </Card>
    <Card sectioned>
      <TextContainer>
        <SkeletonDisplayText size="small" />
        <SkeletonBodyText />
      </TextContainer>
    </Card>
    <Card sectioned>
      <TextContainer>
        <SkeletonDisplayText size="small" />
        <SkeletonBodyText />
      </TextContainer>
    </Card>
  </Layout.Section>
  <Layout.Section secondary>
    <Card>
      <Card.Section>
        <TextContainer>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText lines={2} />
        </TextContainer>
      </Card.Section>
      <Card.Section>
        <SkeletonBodyText lines={1} />
      </Card.Section>
    </Card>
    <Card subdued>
      <Card.Section>
        <TextContainer>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText lines={2} />
        </TextContainer>
      </Card.Section>
      <Card.Section>
        <SkeletonBodyText lines={2} />
      </Card.Section>
    </Card>
  </Layout.Section>
</Layout>
</SkeletonPage>;

const OrderList2: React.FC = (): ReactElement => {
  const { loading, data, error, progress } = useBulkQuery(getOrders, 50);
  
  return (
    <WithLoader loading={loading} progress={progress} skeleton={skeleton}>
      <>
      {data?.node?.url}
      </>
  </WithLoader>
  )
};

export default OrderList2;