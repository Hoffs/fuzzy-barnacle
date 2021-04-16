import { Flex } from "@chakra-ui/layout";
import { RouteComponentProps } from "@reach/router";
import React, { ReactElement, useEffect } from "react";
import { RelayEnvironmentProvider, useQueryLoader } from "react-relay";
import Environment from "./data/Environment";
import { UrlForm } from "./UrlForm";
import { UrlList } from "./UrlList";
import { UrlListQuery } from "./__generated__/UrlListQuery.graphql";
import UrlListQueryRequest from "./__generated__/UrlListQuery.graphql";
import { useStorageKey } from "../StorageProviderHooks";

function UrlShortenerInner() {
  const storageKey = useStorageKey();
  const [queryRef, loadQuery] = useQueryLoader<UrlListQuery>(
    UrlListQueryRequest
  );

  useEffect(() => {
    loadQuery({ id: storageKey || "" });
  }, [storageKey, loadQuery]);

  return (
    <Flex flexDirection="column">
      <UrlForm storageKey={storageKey} />
      <React.Suspense fallback="Loading">
        {queryRef ? <UrlList queryReference={queryRef} /> : "Loading"}
      </React.Suspense>
    </Flex>
  );
}

export function UrlShortener(_: RouteComponentProps): ReactElement {
  return (
    <RelayEnvironmentProvider environment={Environment}>
      <UrlShortenerInner />
    </RelayEnvironmentProvider>
  );
}
