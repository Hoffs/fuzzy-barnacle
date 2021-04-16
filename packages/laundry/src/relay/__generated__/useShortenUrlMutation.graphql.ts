/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type useShortenUrlMutationVariables = {
    url: string;
    storageId?: string | null;
};
export type useShortenUrlMutationResponse = {
    readonly shortenUrl: {
        readonly url: {
            readonly id: string;
            readonly url: string;
            readonly key: string;
        } | null;
        readonly storageId: string | null;
    };
};
export type useShortenUrlMutation = {
    readonly response: useShortenUrlMutationResponse;
    readonly variables: useShortenUrlMutationVariables;
};



/*
mutation useShortenUrlMutation(
  $url: String!
  $storageId: ID
) {
  shortenUrl(data: {url: $url, storageId: $storageId}) {
    url {
      id
      url
      key
    }
    storageId
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "storageId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "url"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "storageId",
            "variableName": "storageId"
          },
          {
            "kind": "Variable",
            "name": "url",
            "variableName": "url"
          }
        ],
        "kind": "ObjectValue",
        "name": "data"
      }
    ],
    "concreteType": "ShortenUrlPayload",
    "kind": "LinkedField",
    "name": "shortenUrl",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Url",
        "kind": "LinkedField",
        "name": "url",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "url",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "key",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "storageId",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useShortenUrlMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useShortenUrlMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "7ab3a186968326c160490e0988b6e58d",
    "id": null,
    "metadata": {},
    "name": "useShortenUrlMutation",
    "operationKind": "mutation",
    "text": "mutation useShortenUrlMutation(\n  $url: String!\n  $storageId: ID\n) {\n  shortenUrl(data: {url: $url, storageId: $storageId}) {\n    url {\n      id\n      url\n      key\n    }\n    storageId\n  }\n}\n"
  }
};
})();
(node as any).hash = '47aa9dcfc7b9c31276ae45fae5f6f9f6';
export default node;
