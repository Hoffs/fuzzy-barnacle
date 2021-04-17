import { Flex } from "@chakra-ui/layout";
import { RouteComponentProps } from "@reach/router";
import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext, useEffect } from "react";
import { useStorageKey } from "../StorageProviderHooks";
import Shortener, { ShortenerContext } from "./Shortener";
import { UrlForm } from "./UrlForm";
import { UrlList } from "./UrlList";

const UrlShortenerInner = observer(() => {
  const shortener = useContext(ShortenerContext);
  const storageKey = useStorageKey();

  useEffect(() => {
    shortener.storageId = storageKey;
  }, [storageKey]); // complains about setter not being a dependency.

  return (
    <Flex flexDirection="column">
      <UrlForm />
      <UrlList />
    </Flex>
  );
});

export interface UrlShortenerProps extends RouteComponentProps {}

// Because provider is inside the path, navigating back/forwards seems to destroy
// mobx state. To solve that, should probably move the Provider up a bit.
export function UrlShortener(props: UrlShortenerProps): ReactElement {
  return (
    <ShortenerContext.Provider value={new Shortener()}>
      <UrlShortenerInner />
    </ShortenerContext.Provider>
  );
}
