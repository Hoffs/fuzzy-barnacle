import { Flex } from "@chakra-ui/layout";
import { RouteComponentProps, useMatch } from "@reach/router";
import React, { ReactElement, useEffect, useState } from "react";
import { ShortenedUrl } from "./ShortenedUrl";
import { UrlForm } from "./UrlForm";
import { UrlList } from "./UrlList";

export interface UrlShortenerProps extends RouteComponentProps {
}

const mapToShortened = (id: string, url: string): ShortenedUrl => {
  return { id: id, fullUrl: url, shortUrl: `https://localhost:3000/a/${url}` };
};

export function UrlShortener(props: UrlShortenerProps): ReactElement {
  const match = useMatch("/vanilla/:storageKey");
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  useEffect(() => setUrls([]), [match?.storageKey]); // TODO: Do something when we update key.
  const addUrl = (url: string) =>
    setUrls((prevUrls) => [
      ...prevUrls,
      mapToShortened(String(prevUrls.length + 1), url),
    ]);

  return (
    <Flex flexDirection="column">
      <UrlForm onSubmit={addUrl} />
      <UrlList
        urls={urls}
        onDelete={(id) =>
          setUrls((prevUrls) => prevUrls.filter((x) => x.id !== id))
        }
      />
    </Flex>
  );
}
