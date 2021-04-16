import { Environment, Network, RecordSource, Store } from "relay-runtime";

async function fetchQuery(operation: any, variables: any) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    });
    return await response.json();
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
