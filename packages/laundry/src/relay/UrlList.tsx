import { Box, VStack } from "@chakra-ui/layout";
import { Heading, StackDivider } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { UrlListQuery } from "./__generated__/UrlListQuery.graphql";
import { graphql } from "babel-plugin-relay/macro";
import { UrlItem } from "./UrlItem";

export interface UrlListProps {
  queryReference: PreloadedQuery<UrlListQuery>;
}

export function UrlList({ queryReference }: UrlListProps): ReactElement {
  // This could also be a "fragment" and then the query would exist in UrlShortener component,
  // but this could also be considered as the "root" that uses the query so it fine this way as
  // well, since theres no initial query that we can perform and have to rely on query loader somewhat.
  const data = usePreloadedQuery<UrlListQuery>(
    graphql`
      query UrlListQuery($id: ID!) {
        storage(id: $id) {
          ...UrlItem_storage
          urls {
            id
            ...UrlItem_url
          }
        }
      }
    `,
    queryReference
  );

  const storage = data.storage;
  const urls = storage?.urls;
  return (
    <Box>
      <Heading fontSize="2xl" mb={4}>
        URLs
      </Heading>
      {/* This doesnt really work */}
      <VStack spacing="12px" divider={<StackDivider />}>
        {!storage
          ? null
          : urls?.map((url) => (
              <UrlItem key={url.id} storage={storage} url={url} />
            ))}
      </VStack>
    </Box>
  );
}
