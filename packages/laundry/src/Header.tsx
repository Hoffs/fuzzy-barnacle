import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce/lib";
import { useStorageData } from "./StorageProviderHooks";

export interface HeaderProps extends RouteComponentProps {}

export default function Header(_: HeaderProps) {
  const [storageData, setStorageData] = useStorageData();
  const [storageKey, setStorageKey] = useState<{
    value: string;
    externalUpdate: boolean;
  }>({ value: storageData.storageKey || "", externalUpdate: true });

  const debouncedGlobalUpdate = useDebouncedCallback((storageKey) => {
    setStorageData((prev) => ({
      ...prev,
      storageKey: storageKey,
      shouldNavigate: true,
    }));
  }, 1000);

  // On state change call callback to set global storageKey, but only
  // if the value was set internally.
  useEffect(() => {
    if (!storageKey.externalUpdate) {
      debouncedGlobalUpdate(storageKey.value);
    }
  }, [storageKey, debouncedGlobalUpdate]);

  // Sync "global" changes to input field.
  useEffect(() => {
    // This will also be called when this component updates global value
    // with same value that we updated.
    setStorageKey({
      value: storageData.storageKey || "",
      externalUpdate: true,
    });
  }, [storageData.storageKey, setStorageKey]);

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
            {storageData.storageKey}
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
