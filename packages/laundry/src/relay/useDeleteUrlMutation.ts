import { useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { useCallback } from "react";
import { useDeleteUrlMutation as useDeleteUrlMutationData } from "./__generated__/useDeleteUrlMutation.graphql";

const mutation = graphql`
  mutation useDeleteUrlMutation($id: String!, $storageId: String!) {
    deleteOneUrl(where: { id: $id, storageId: $storageId }) {
      urlId
      storageId
    }
  }
`;

export default function useDeleteUrlMutation() {
  const [commit] = useMutation<useDeleteUrlMutationData>(mutation);

  const callback = useCallback(
    (id: string, storageId: string) => {
      return new Promise<boolean>((resolve, reject) => {
        commit({
          variables: { id, storageId },
          updater: (store) => {
            const payload = store.getRootField("deleteOneUrl");
            if (!payload) {
              reject("Failed to delete");
              return;
            }

            const payloadStorageId = payload.getValue("storageId");
            if (!payloadStorageId) {
              reject("Failed to delete");
              return;
            }

            const urlId = payload.getValue("urlId");
            if (!urlId) {
              reject("Failed to delete");
              return;
            }

            let storage = store.get(payloadStorageId);
            if (storage) {
              const urls = storage
                .getLinkedRecords("urls")
                ?.filter((x) => x.getDataID() !== urlId);
              storage.setLinkedRecords(urls, "urls");
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
    [commit]
  );

  return [callback];
}
