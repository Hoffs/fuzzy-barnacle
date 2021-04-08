import { gql, useQuery } from "@apollo/client";
import { Url } from "./UrlHooks";

const GET_STORAGE = gql`
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

interface Storage {
  id: string;
  urls: Url[];
}

interface StorageData {
  storage?: Storage;
}

export function useStorage(id?: string) {
  // console.log("using storage", id, Date.now())
  return useQuery<StorageData>(GET_STORAGE, {
    variables: { id },
  });
}
