/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UrlItem_url = {
    readonly id: string;
    readonly url: string;
    readonly key: string;
    readonly " $refType": "UrlItem_url";
};
export type UrlItem_url$data = UrlItem_url;
export type UrlItem_url$key = {
    readonly " $data"?: UrlItem_url$data;
    readonly " $fragmentRefs": FragmentRefs<"UrlItem_url">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UrlItem_url",
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
  "type": "Url",
  "abstractKey": null
};
(node as any).hash = '8d29ed0d838d3fa89a53f660f0eb5f6a';
export default node;
