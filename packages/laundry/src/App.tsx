import React from "react";
import "./App.css";
import { Grid, GridItem } from "@chakra-ui/layout";
import styled from "@emotion/styled";
import Header from "./Header";
import { UrlShortener as VanillaUrlShortener } from "./vanilla/UrlShortener";
import { UrlShortener as GqlUrlShortener } from "./gql/UrlShortener";
import { Redirect, Router } from "@reach/router";
import { StorageProvider } from "./RouteHooks";

const CenteredGrid = styled(Grid)`
  & > * {
    grid-column: 2;
  }
`;

const FullBleedGridItem = styled(GridItem)`
  grid-column: 1 / -1;
`;

function App() {
  return (
    <CenteredGrid
      templateColumns="1fr min(60ch, calc(100% - 64px)) 1fr"
      columnGap="32px"
      path="/"
    >
      <StorageProvider>
        <FullBleedGridItem>
          <Router>
            <Header path="/*" />
          </Router>
        </FullBleedGridItem>
        <Router>
          <VanillaUrlShortener path="/vanilla/*" />
          <GqlUrlShortener path="/gql/*" />
          <Redirect noThrow from="/*" to="/vanilla/" />
        </Router>
      </StorageProvider>
    </CenteredGrid>
  );
}

export default App;
