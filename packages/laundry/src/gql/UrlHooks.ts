import { FetchResult, gql, MutationResult, useMutation } from "@apollo/client";
import { GET_STORAGE, StorageData } from "./StorageHooks";

export interface Url {
  id: string;
  url: string;
  key: string;
}

interface ShortenUrlInput {
  url: string;
  storageId?: string;
}

interface ShortenedUrl {
  url?: Url;
  storageId?: string;
}

interface ShortenedUrlData {
  shortenUrl: ShortenedUrl;
}

const SHORTEN_URL = gql`
  mutation ShortenUrl($url: String!, $storageId: ID) {
    shortenUrl(data: { url: $url, storageId: $storageId }) {
      url {
        id
        url
        key
      }
      storageId
    }
  }
`;

export function useShortenUrl(): [
  (
    url: string,
    storageId?: string | undefined
  ) => Promise<
    FetchResult<ShortenedUrlData, Record<string, any>, Record<string, any>>
  >,
  MutationResult<ShortenedUrlData>
] {
  const [shortenUrl, data] = useMutation<ShortenedUrlData, ShortenUrlInput>(
    SHORTEN_URL,
    {
      update(cache, mResult) {
        // Check if storage exists first.
        if (!mResult.data) {
          return;
        }

        const qResult = cache.readQuery<StorageData>({
          query: GET_STORAGE,
          variables: { id: mResult.data.shortenUrl.storageId },
        });
        if (!qResult?.storage) {
          // Create storage locally before adding shortened url.
          cache.writeQuery({
            query: gql`
              query WriteStorage($id: ID!) {
                storage(id: $id) {
                  id
                  urls {
                    id
                  }
                }
              }
            `,
            data: {
              storage: {
                __typename: "Storage",
                id: mResult.data.shortenUrl.storageId,
                urls: [],
              },
            },
            variables: { id: mResult.data.shortenUrl.storageId },
          });
        }

        // Modify cache to insert shortened url to storage.
        cache.modify({
          id: cache.identify({
            __typename: "Storage",
            id: mResult.data.shortenUrl.storageId,
          }),
          fields: {
            urls(cachedUrls) {
              return [
                ...cachedUrls,
                {
                  __ref: cache.identify({
                    __typename: "Url",
                    id: mResult.data?.shortenUrl.url?.id,
                  }),
                },
              ];
            },
          },
        });
      },
    }
  );

  const simpleShortenUrl = (url: string, storageId?: string) =>
    shortenUrl({ variables: { url, storageId } });
  return [simpleShortenUrl, data];
}

const DELETE_URL = gql`
  mutation DeleteUrl($id: ID!, $storageId: ID!) {
    deleteOneUrl(where: { id: $id, storageId: $storageId }) {
      id
      storageId
    }
  }
`;

interface DeleteUrlInput {
  id: string;
  storageId: string;
}

interface DeleteUrlData {
  deleteOneUrl: { id: string; storageId: string };
}

export function useDeleteUrl(): [
  (
    id: string,
    storageId: string
  ) => Promise<
    FetchResult<DeleteUrlData, Record<string, any>, Record<string, any>>
  >,
  MutationResult<DeleteUrlData>
] {
  const [deleteUrl, mutationData] = useMutation<DeleteUrlData, DeleteUrlInput>(
    DELETE_URL,
    {
      update(cache, result) {
        cache.modify({
          id: cache.identify({
            __typename: "Storage",
            id: result.data?.deleteOneUrl.storageId,
          }),
          fields: {
            urls(cachedUrls: Readonly<Url>[], { readField }) {
              return cachedUrls.filter(
                (ref) => readField("id", ref) !== result.data?.deleteOneUrl.id
              );
            },
          },
        });
      },
    }
  );

  const simpleDeleteUrl = (id: string, storageId: string) =>
    deleteUrl({ variables: { id: id, storageId: storageId } });

  return [simpleDeleteUrl, mutationData];
}
