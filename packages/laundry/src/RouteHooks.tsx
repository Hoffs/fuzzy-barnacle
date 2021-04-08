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
  shouldNavigate: boolean;
}

interface StorageContextValue {
  data: StorageData;
  setData(action: SetStateAction<StorageData>): void;
}

export const StorageContext = React.createContext<StorageContextValue>({
  data: { version: "vanilla", shouldNavigate: false },
  setData: () => {},
});

const { Provider } = StorageContext;
export const StorageProvider = ({ children }: PropsWithChildren<{}>) => {
  const path = useLocationPath();

  const parsePath = (
    path: string
  ): { version?: string; storageKey?: string } => {
    const pathParts = path.split("/").slice(1);
    return { version: pathParts[0], storageKey: pathParts[1] };
  };

  // Assume "vanilla" because of redirect that exists. Otherwise this
  // bit also becomes tricky to manage due to redirect, as we would have to somehow sync
  // when redirected.
  const { version, storageKey } = parsePath(path.path);
  const [data, setData] = useState<StorageData>({
    version: version || "vanilla",
    storageKey: storageKey,
    shouldNavigate: false,
  });

  useEffect(() => {
    console.debug("Updating storage data based on path change", path);
    const { version, storageKey } = parsePath(path.path);
    setData({
      version: version || "vanilla",
      storageKey: storageKey,
      shouldNavigate: false,
    });
  }, [path, setData]);

  useEffect(() => {
    console.debug("Maybe navigating", data);
    if (data.shouldNavigate) {
      console.debug("Navigating", data);
      window.history.pushState(
        null,
        `${data.version}|${data.storageKey}`,
        `/${data.version}/${data.storageKey}`
      );
    }
  }, [data]);

  const value: StorageContextValue = {
    data: data,
    setData: setData,
  };

  return <Provider value={value}>{children}</Provider>;
};

export function useStorageKey(): [string | undefined] {
  const context = useContext(StorageContext);
  return [context.data.storageKey];
}

export function useStorageData(): [StorageData, (data: StorageData) => void] {
  const context = useContext(StorageContext);
  return [context.data, context.setData];
}

function useLocationPath() {
  // Because we don't track in-app forward changes, but only popstate
  // we can end up with setState(path) where path == statePath, while
  // the actual previous path was not reflected in statePath. E.g.
  // Load at '/a/b', navigate to '/a/c' in app, press back (to '/a/b').
  // In this case '/a/c' is not reflected in statePath, so update is NOP.
  // Hence key is used to force update.
  const [path, setPath] = useState<{ path: string; key: number }>({
    path: window.location.pathname,
    key: Date.now(),
  });

  const popstateHandler = () => {
    const winPath = window.location.pathname;
    setPath({ path: winPath, key: Date.now() });
  };

  useEffect(() => {
    window.addEventListener("popstate", popstateHandler);
    return () => {
      window.removeEventListener("popstate", popstateHandler);
    };
  }, []);

  return path;
}
