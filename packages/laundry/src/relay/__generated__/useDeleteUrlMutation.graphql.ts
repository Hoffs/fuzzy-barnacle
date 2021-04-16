/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type useDeleteUrlMutationVariables = {
    id: string;
    storageId: string;
};
export type useDeleteUrlMutationResponse = {
    readonly deleteOneUrl: {
        readonly urlId: string | null;
        readonly storageId: string | null;
    };
};
export type useDeleteUrlMutation = {
    readonly response: useDeleteUrlMutationResponse;
    readonly variables: useDeleteUrlMutationVariables;
};



/*
mutation useDeleteUrlMutation(
  $id: String!
  $storageId: String!
) {
  deleteOneUrl(where: {id: $id, storageId: $storageId}) {
    urlId
    storageId
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "storageId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          },
          {
            "kind": "Variable",
            "name": "storageId",
            "variableName": "storageId"
          }
        ],
        "kind": "ObjectValue",
        "name": "where"
      }
    ],
    "concreteType": "DeleteUrlPayload",
    "kind": "LinkedField",
    "name": "deleteOneUrl",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "urlId",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useDeleteUrlMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDeleteUrlMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "936d191a9c915a1b614adbc0e9008fb4",
    "id": null,
    "metadata": {},
    "name": "useDeleteUrlMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteUrlMutation(\n  $id: String!\n  $storageId: String!\n) {\n  deleteOneUrl(where: {id: $id, storageId: $storageId}) {\n    urlId\n    storageId\n  }\n}\n"
  }
};
})();
(node as any).hash = '9f3ac930db0af9d82b784b23bd3d08ee';
export default node;
