/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UrlListQueryVariables = {
    id: string;
};
export type UrlListQueryResponse = {
    readonly storage: {
        readonly urls: ReadonlyArray<{
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"UrlItem_url">;
        }>;
        readonly " $fragmentRefs": FragmentRefs<"UrlItem_storage">;
    } | null;
};
export type UrlListQuery = {
    readonly response: UrlListQueryResponse;
    readonly variables: UrlListQueryVariables;
};



/*
query UrlListQuery(
  $id: ID!
) {
  storage(id: $id) {
    ...UrlItem_storage
    urls {
      id
      ...UrlItem_url
    }
    id
  }
}

fragment UrlItem_storage on Storage {
  id
}

fragment UrlItem_url on Url {
  id
  url
  key
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UrlListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Storage",
        "kind": "LinkedField",
        "name": "storage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Url",
            "kind": "LinkedField",
            "name": "urls",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "UrlItem_url"
              }
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UrlItem_storage"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UrlListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Storage",
        "kind": "LinkedField",
        "name": "storage",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Url",
            "kind": "LinkedField",
            "name": "urls",
            "plural": true,
            "selections": [
              (v2/*: any*/),
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "cf74c0a3da1c357ab16fb94031f36826",
    "id": null,
    "metadata": {},
    "name": "UrlListQuery",
    "operationKind": "query",
    "text": "query UrlListQuery(\n  $id: ID!\n) {\n  storage(id: $id) {\n    ...UrlItem_storage\n    urls {\n      id\n      ...UrlItem_url\n    }\n    id\n  }\n}\n\nfragment UrlItem_storage on Storage {\n  id\n}\n\nfragment UrlItem_url on Url {\n  id\n  url\n  key\n}\n"
  }
};
})();
(node as any).hash = '1c63d4348bd2704677be3bb7abf5a3ea';
export default node;
