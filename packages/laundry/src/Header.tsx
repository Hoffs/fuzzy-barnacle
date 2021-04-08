import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import { RouteComponentProps, useMatch, useNavigate } from "@reach/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDebounce, useDebouncedCallback } from "use-debounce/lib";
import {
  useStorageKey,
  // useVersion,
  useRouteVersionAndStorageKey,
  useStorageData,
  StorageContext,
} from "./RouteHooks";

export interface HeaderProps extends RouteComponentProps {}

export default function Header(props: HeaderProps) {
  // const [cVersion, setCVersion] = useVersion();
  // const [cStorageKey, setCStorageKey] = useStorageKey();
  const [rVersion, rStorageKey] = useRouteVersionAndStorageKey();
  // const [storageKey, setStorageKey] = useState<string>(rStorageKey || "");
  const [storageKey, setStorageKey] = useState<{
    value: string;
    externalUpdate: boolean;
  }>({ value: rStorageKey || "", externalUpdate: true });
  const [sData, setSData] = useStorageData();
  const [cStorageKey] = useStorageKey();
  const sContext = useContext(StorageContext);

  // Update initial values based on route stuff.
  // This is not the best place to do this.
  // Ideally the StorageContext could initialize values using LocationContext by itself.
  // useEffect(() => {
  //   if (rVersion) {
  //     setCVersion(rVersion);
  //   }
  //   setCStorageKey(rStorageKey);
  // }, [rVersion, setCVersion, rStorageKey, setCStorageKey]);
  useEffect(() => {
    console.log("updating sData from external");
    setSData({
      version: rVersion || "vanilla",
      storageKey: rStorageKey,
      updatedExternally: true,
    });
  }, [rVersion, rStorageKey, setSData]);

  // Standard debounced storage key value, to avoid updating "global"
  // storage key repeatedly.
  // const [debouncedStorageKey] = useDebounce(storageKey, 1000);

  const setSDataAlt = sContext.setData;
  const debouncedGlobalUpdate = useDebouncedCallback((storageKey) => {
    console.log("Updating based on debounced", storageKey);
    // if (storageKey !== undefined) {
      setSDataAlt((prev) => ({
        ...prev,
        storageKey: storageKey,
        updatedExternally: false,
      }));
      // setCStorageKey(debouncedStorageKey, false);
    // }
  }, 1000);

  useEffect(() => {
    if (!storageKey.externalUpdate) {
      debouncedGlobalUpdate(storageKey.value);
    }
  }, [storageKey, debouncedGlobalUpdate]);
  // useEffect(() => {
  //   if (debouncedStorageKey) {
  //     setCStorageKey(debouncedStorageKey);
  //   }
  // }, [setCStorageKey, debouncedStorageKey]);
  // useEffect(() => {
  //   console.log("Updating based on debounced", debouncedStorageKey);
  //   if (debouncedStorageKey) {
  //     setSDataAlt ((prev) => ({
  //       ...prev,
  //       storageKey: debouncedStorageKey,
  //       updatedExternally: false,
  //     }));
  //     // setCStorageKey(debouncedStorageKey, false);
  //   }
  // }, [debouncedStorageKey, setSDataAlt ]);

  // Sync "global" changes to input field.
  useEffect(() => {
    console.log("Syncing global to input", cStorageKey);
    // TODO: If update was received externally this should not
    // trigger backwards loop to debounced update.
      setStorageKey({ value: cStorageKey || "", externalUpdate: true });
  }, [cStorageKey, setStorageKey]);

  // Navigation logic when "global" storage data changes.
  const navigate = useNavigate();
  const firstRender = useRef(true);
  useEffect(() => {
    const sData = sContext.data;
    if (!firstRender.current) {
      // console.log("navigating?", rVersion, cVersion, rStorageKey, cStorageKey)
      // if (rVersion !== cVersion || rStorageKey !== cStorageKey) {

      console.log("navigating?", sData);
      if (!sData.updatedExternally) {
        if (rVersion !== sData.version || rStorageKey !== sData.storageKey) {
          const uri = `/${sData.version}/${sData.storageKey}`;
          console.log("Navigating to", uri);
          navigate(uri);
        }
      }
      // }
    } else {
      firstRender.current = false;
    }
  }, [navigate, rVersion, rStorageKey, sContext.data]);

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        w="100%"
        p={4}
      >
        <Input
          onChange={(e) => {
            setStorageKey({ value: e.target.value, externalUpdate: false });
            // debounced(e.target.value);
          }}
          placeholder="Storage Key"
          maxWidth="40ch"
          value={storageKey.value}
          mr="1ch"
          maxLength={36}
          textAlign="center"
        />
        <HStack spacing="12px">
          <Button variant="outline" minWidth="92px">
            {rStorageKey}
          </Button>
          <Button
            variant="outline"
            onClick={toggleColorMode}
            leftIcon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          >
            {colorMode === "light" ? "Dark" : "Light"}
          </Button>
        </HStack>
      </Flex>
      <Divider mb={12} />
    </>
  );
}
