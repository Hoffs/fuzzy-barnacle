import { CopyIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Link, VStack, HStack, Text } from "@chakra-ui/layout";
import {
  Flex,
  Heading,
  IconButton,
  StackDivider,
  Tooltip,
} from "@chakra-ui/react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext } from "react";
import { ShortenedUrl, ShortenerContext } from "./Shortener";

export const UrlList = observer(() => {
  const shortener = useContext(ShortenerContext);

  return (
    <>
      <Heading fontSize="2xl" mb={4}>
        URLs ({shortener.storageId})
      </Heading>
      <VStack spacing="12px" divider={<StackDivider />}>
        {shortener.urls.map((url) =>
          // Not 100% if creating a closure for onDelete is correct, but it works (passing shortener.deleteUrl doesnt).
          UrlItem({ url: toJS(url), onDelete: (id) => shortener.deleteUrl(id) })
        )}
      </VStack>
    </>
  );
});

const copyToClipboard = (text: string): Promise<void> => {
  return navigator.clipboard.writeText(text);
};

interface UrlItemProps {
  url: ShortenedUrl;
  onDelete(id: string): void;
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
          onClick={() => copyToClipboard(shortUrl)}
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
