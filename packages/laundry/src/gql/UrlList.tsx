import { CopyIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Link, VStack, HStack, Text, Box } from "@chakra-ui/layout";
import {
  Flex,
  Heading,
  IconButton,
  Skeleton,
  StackDivider,
  Tooltip,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { useStorageKey } from "../StorageProviderHooks";
import { useStorage } from "./StorageHooks";
import { Url, useDeleteUrl } from "./UrlHooks";

export function UrlList(): ReactElement {
  // NOTE: This component kinda breaks with react livereload (https://github.com/apollographql/apollo-client/pull/7952)
  const storageKey = useStorageKey();
  const storageQ = useStorage(storageKey);
  const { loading, error, data } = storageQ;
  const [deleteUrl] = useDeleteUrl();

  if (error) return <>`Error: ${error.message}`</>;

  return (
    <Box>
      <Heading fontSize="2xl" mb={4}>
        URLs
      </Heading>
      {/* This doesnt really work */}
      <Skeleton isLoaded={!loading || !!data?.storage}>
        <VStack spacing="12px" divider={<StackDivider />}>
          {data?.storage?.urls.map((url) =>
            UrlItem({
              url,
              onDelete: (u) => deleteUrl(u.id, storageKey || ""),
            })
          )}
        </VStack>
      </Skeleton>
    </Box>
  );
}

interface UrlItemProps {
  url: Url;
  onDelete(url: Url): void;
}

function UrlItem(props: UrlItemProps): ReactElement {
  const shortUrl = `${process.env.REACT_APP_API_URL}/a/${props.url.key}`;
  return (
    <Flex
      key={props.url.id}
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Link overflowX="hidden" href={shortUrl}>
        <Tooltip hasArrow label={shortUrl}>
          <Text isTruncated fontSize="md">
            {props.url.url}
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
          onClick={() => props.onDelete(props.url)}
          icon={<DeleteIcon />}
        />
      </HStack>
    </Flex>
  );
}
