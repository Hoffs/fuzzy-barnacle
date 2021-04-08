import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Flex } from "@chakra-ui/layout";
import { RouteComponentProps } from "@reach/router";
import React, { ReactElement } from "react";
import { UrlForm } from "./UrlForm";
import { UrlList } from "./UrlList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export function UrlShortener(_: RouteComponentProps): ReactElement {
  return (
    <ApolloProvider client={client}>
      <Flex flexDirection="column">
        <UrlForm />
        <UrlList />
      </Flex>
    </ApolloProvider>
  );
}
