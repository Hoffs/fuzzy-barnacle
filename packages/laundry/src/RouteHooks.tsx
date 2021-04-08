import { useMatch } from "@reach/router";
import React, {
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export function useRouteVersionAndStorageKey() {
  const match = useMatch("/:version/:storageKey");
  const matchAlt = useMatch("/:version");

  const matchVersion = match?.version;
  const matchBakVersion = matchAlt?.version;
  const matchStorageKey = match?.storageKey || "";

  const [version, setVersion] = useState(matchVersion || matchBakVersion);
  useEffect(() => {
    if (matchVersion) {
      setVersion(matchVersion);
    } else if (matchBakVersion) {
      setVersion(matchBakVersion);
    }
  }, [matchVersion, matchBakVersion]);

  return [version, matchStorageKey];
}

interface StorageData {
  version: string;
  storageKey?: string;
  updatedExternally: boolean;
}

interface StorageContextValue {
  data: StorageData;
  setData(action: SetStateAction<StorageData>): void;
}

export const StorageContext = React.createContext<StorageContextValue>({
  data: { version: "vanilla", updatedExternally: true },
  setData: () => {},
});

const { Provider } = StorageContext;
export const StorageProvider = ({ children }: PropsWithChildren<{}>) => {
  const pathParts = window.location.pathname.split("/").slice(1);
  const uriVersion = pathParts[0];
  const uriStorage = pathParts[1];

  // Assume "vanilla" because of redirect that exists. Otherwise this
  // bit also becomes tricky to manage due to redirect, as we would have to somehow sync
  // when redirected.
  const [data, setData] = useState<StorageData>({
    version: uriVersion || "vanilla",
    storageKey: uriStorage,
    updatedExternally: true,
  });
  // const [version, setVersion] = useState(uriVersion || "vanilla");
  // const [storageKey, setStorageKey] = useState<string | undefined>(uriStorage);

  const value: StorageContextValue = {
    data: data,
    setData: setData,
  };

  return <Provider value={value}>{children}</Provider>;
};

// export function useVersion(): [string, (version: string) => void] {
//   const context = useContext(StorageContext);
//   return [context.version, context.setVersion];
// }

// export function useStorageKey(): [string | undefined, (storageKey: string | undefined) => void] {
//   const context = useContext(StorageContext);
//   return [context.storageKey, context.setStorageKey];
// }

export function useStorageKey(): [string | undefined] {
  const context = useContext(StorageContext);
  return [context.data.storageKey];
}

export function useStorageData(): [StorageData, (data: StorageData) => void] {
  const context = useContext(StorageContext);
  return [context.data, context.setData];
}
