import React, { ReactElement } from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { UrlItem_storage$key } from "./__generated__/UrlItem_storage.graphql";
import { UrlItem_url$key } from "./__generated__/UrlItem_url.graphql";
import {
  Text,
  Flex,
  HStack,
  IconButton,
  Link,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { CopyIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import useDeleteUrlMutation from "./useDeleteUrlMutation";

export interface UrlItemProps {
  storage: UrlItem_storage$key;
  url: UrlItem_url$key;
}

export function UrlItem(props: UrlItemProps): ReactElement | null {
  const toast = useToast();
  const [commit] = useDeleteUrlMutation();
  const storage = useFragment(
    graphql`
      fragment UrlItem_storage on Storage {
        id
      }
    `,
    props.storage
  );

  const item = useFragment(
    graphql`
      fragment UrlItem_url on Url {
        id
        url
        key
      }
    `,
    props.url
  );

  const shortUrl = `${process.env.REACT_APP_API_URL}/a/${item.key}`;
  return (
    <Flex
      key={item.id}
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Link overflowX="hidden" href={shortUrl}>
        <Tooltip hasArrow label={shortUrl}>
          <Text isTruncated fontSize="md">
            {item.url}
            <ExternalLinkIcon ml="2px" />
          </Text>
        </Tooltip>
      </Link>
      <HStack spacing="8px">
        <IconButton
          variant="outline"
          aria-label="Copy URL"
          onClick={() => navigator.clipboard.writeText(shortUrl)}
          icon={<CopyIcon />}
        />
        <IconButton
          variant="outline"
          aria-label="Delete URL"
          onClick={() => {
            commit(item.id, storage.id).catch((err) =>
              toast({ title: err, status: "error" })
            );
          }}
          icon={<DeleteIcon />}
        />
      </HStack>
    </Flex>
  );
}
