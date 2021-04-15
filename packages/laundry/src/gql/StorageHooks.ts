import { gql, useQuery } from "@apollo/client";
import { Url } from "./UrlHooks";

export const GET_STORAGE = gql`
  query GetStorage($id: ID!) {
    storage(id: $id) {
      id
      urls {
        id
        url
        key
      }
    }
  }
`;

export interface Storage {
  id: string;
  urls: Url[];
}

export interface StorageData {
  storage?: Storage;
}

export function useStorage(id?: string) {
  return useQuery<StorageData>(GET_STORAGE, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });
}
