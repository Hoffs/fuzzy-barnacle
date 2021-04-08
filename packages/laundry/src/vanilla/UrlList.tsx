import { CopyIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Link, VStack, HStack, Text } from "@chakra-ui/layout";
import { Flex, Heading, IconButton, StackDivider, Tooltip } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { ShortenedUrl } from "./ShortenedUrl";

export interface UrlListProps {
  urls: ShortenedUrl[];
  onDelete(id: string): void;
  storageKey?: string;
}

export function UrlList(props: UrlListProps): ReactElement | null {
  return (
    <>
      <Heading fontSize="2xl" mb={4}>URLs</Heading>
      <VStack spacing="12px" divider={<StackDivider />}>
        {props.urls.map((url) => UrlItem({ url, onDelete: props.onDelete }))}
      </VStack>
    </>
  );
}

const copyToClipboard = (text: string): Promise<void> => {
  return navigator.clipboard.writeText(text);
};

interface UrlItemProps {
  url: ShortenedUrl;
  onDelete(id: string): void;
}

function UrlItem(props: UrlItemProps): ReactElement {
  return (
    <Flex
      key={props.url.id}
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Link overflowX="hidden" href={props.url.shortUrl}>
        <Tooltip hasArrow label={props.url.shortUrl}>
          <Text isTruncated fontSize="md">
            {props.url.fullUrl}
            <ExternalLinkIcon ml="2px" />
          </Text>
        </Tooltip>
      </Link>
      <HStack spacing="8px">
        <IconButton
          variant="outline"
          aria-label="Copy URL"
          onClick={() => copyToClipboard(props.url.shortUrl)}
          icon={<CopyIcon />}
        />
        <IconButton
          variant="outline"
          aria-label="Delete URL"
          onClick={() => props.onDelete(props.url.id)}
          icon={<DeleteIcon />}
        />
      </HStack>
    </Flex>
  );
}
