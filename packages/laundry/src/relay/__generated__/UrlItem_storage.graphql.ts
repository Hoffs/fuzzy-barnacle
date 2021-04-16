/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UrlItem_storage = {
    readonly id: string;
    readonly " $refType": "UrlItem_storage";
};
export type UrlItem_storage$data = UrlItem_storage;
export type UrlItem_storage$key = {
    readonly " $data"?: UrlItem_storage$data;
    readonly " $fragmentRefs": FragmentRefs<"UrlItem_storage">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UrlItem_storage",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Storage",
  "abstractKey": null
};
(node as any).hash = 'd808e1c5a65b60c897382a6c2242c78f';
export default node;
