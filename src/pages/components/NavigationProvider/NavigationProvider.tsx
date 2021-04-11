import { Navigation, TopBar, Frame } from "@shopify/polaris";
import {
  ArrowLeftMinor,
  OrdersMajor,
  ConversationMinor,
} from "@shopify/polaris-icons";
import React, { ReactElement } from "react";
import { useState, useCallback } from "react";
import SupportModal from "../Support/SupportModal";
import { useModal } from "../../../common/Modal/useModal";
import { SUPPORT_MODAL_ID } from "../Support/SupportModal";

interface OwnProps {
  children: React.Component[];
}

const NavigationProvider: React.FC = (props: OwnProps): ReactElement => {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const { showModal } = useModal(SUPPORT_MODAL_ID);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: "Back to Shopify",
            icon: ArrowLeftMinor,
          },
        ]}
      />
      <Navigation.Section
        separator
        title="Compass App"
        items={[
          {
            label: "Global Order Router",
            icon: OrdersMajor,
            onClick: () => {
              // TODO
            },
          },
        ]}
        action={{
          accessibilityLabel: "Contact support",
          icon: ConversationMinor,
          onClick: showModal,
        }}
      />
    </Navigation>
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
    >
      <SupportModal />
      {props.children}
    </Frame>
  );
};

export default NavigationProvider;
