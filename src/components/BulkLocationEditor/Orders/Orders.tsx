import { useCallback, useRef, useState } from "react";
import React from "react";
import { TextField, Card, Filters, Select } from "@shopify/polaris";
import OrderList from "../OrderList/OrderList";
import { debounce } from "lodash";

export const Orders: React.FC = (): React.ReactElement => {
  const abortController = useRef(null);
  const [taggedWith, setTaggedWith] = useState("VIP");
  const [queryValue, setQueryValue] = useState(null);
  const [debouncedQueryValue, setDebouncedQueryValue] = useState(queryValue);
  const [sortValue, setSortValue] = useState("today");
  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    []
  );
  const setQueryValueDebounced = useCallback(
    debounce((value) => {
      if (process.browser) {
        abortController.current = new window.AbortController();
      }
      setDebouncedQueryValue(value);
    }, 1000),
    []
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleQueryValueChange = useCallback(
    (value = null) => {
      if (abortController.current) {
        abortController.current.abort();
        console.log("aborted");
      }
      setQueryValue(value);
      setQueryValueDebounced(value);
    },
    [setQueryValueDebounced]
  );
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);
  const handleSortChange = useCallback((value) => setSortValue(value), []);

  const filters = [
    {
      key: "taggedWith",
      label: "Tagged with",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = !isEmpty(taggedWith)
    ? [
        {
          key: "taggedWith",
          label: disambiguateLabel("taggedWith", taggedWith),
          onRemove: handleTaggedWithRemove,
        },
      ]
    : [];

  const sortOptions = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 days", value: "lastWeek" },
  ];

  return (
    <Card>
      <div style={{ padding: "16px", display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Filters
            queryValue={queryValue}
            filters={filters}
            appliedFilters={appliedFilters}
            onQueryChange={handleQueryValueChange}
            onQueryClear={() => handleQueryValueChange(null)}
            onClearAll={handleClearAll}
          />
        </div>
        <div style={{ paddingLeft: "0.4rem" }}>
          <Select
            labelInline
            label="Sort by"
            options={sortOptions}
            value={sortValue}
            onChange={handleSortChange}
          />
        </div>
      </div>
      <OrderList
        query={debouncedQueryValue}
        abortController={abortController.current}
      />
    </Card>
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case "taggedWith":
        return `Tagged with ${value}`;
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
};
