import { useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { useCallback } from "react";
import { useShortenUrlMutation as useShortenUrlMutationData } from "./__generated__/useShortenUrlMutation.graphql";
import { useStorageData } from "../StorageProviderHooks";

const mutation = graphql`
  mutation useShortenUrlMutation($url: String!, $storageId: ID) {
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

export default function useShortenUrlMutation() {
  const [commit] = useMutation<useShortenUrlMutationData>(mutation);
  const [, setStorageData] = useStorageData();

  const callback = useCallback(
    (url: string, storageId?: string) => {
      return new Promise<boolean>((resolve, reject) => {
        commit({
          variables: { url, storageId },
          updater: (store) => {
            const payload = store.getRootField("shortenUrl");
            if (!payload) {
              return;
            }

            const payloadStorageId = payload.getValue("storageId");
            if (!payloadStorageId) {
              return;
            }

            const url = payload.getLinkedRecord("url");
            if (!url) {
              return;
            }

            let storage = store.get(payloadStorageId);
            const shouldNavigate = !storage;
            if (!storage) {
              storage = store.create(payloadStorageId, "Storage");
              storage.setValue("id", payloadStorageId);
            }

            const urls = [...(storage.getLinkedRecords("urls") || []), url];

            storage.setLinkedRecords(urls, "urls");
            if (shouldNavigate) {
              setStorageData({
                version: "relay",
                storageKey: payloadStorageId,
                shouldNavigate: true,
              });
            }
          },
          onCompleted: () => {
            resolve(true);
          },
          onError: (error) => {
            reject(error);
          },
        });
      });
    },
    [commit, setStorageData]
  );

  return [callback];
}
