import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export interface ShortenedUrl {
  id: string;
  url: string;
  key: string;
}

interface DeletableShortenedUrl extends ShortenedUrl {
  deleted: boolean;
}

interface Storage {
  [key: string]: DeletableShortenedUrl[];
}

class Shortener {
  private _storageId: string | undefined = undefined;
  private _storage: Storage = { };

  constructor() {
    makeAutoObservable(this);
  }

  private get currentStorage(): DeletableShortenedUrl[] {
    let storage = this._storage[this._storageId || ""];
    if (!storage) {
      this._storage[this._storageId || ""] = [];
      storage = this._storage[this._storageId || ""];
    }

    return storage;
  }

  get storageId(): string | undefined {
    return this._storageId;
  }

  set storageId(id: string | undefined) {
    if (id === this._storageId) {
      return;
    }
    this._storageId = id;
  }

  get urls(): ShortenedUrl[] {
    return this.currentStorage.filter((x) => !x.deleted) || [];
  }

  shortenUrl(url: string) {
    const storage = this.currentStorage;
    const shortened = {
      id: storage.length.toString(),
      url: url,
      key: storage.length.toString(),
      deleted: false,
    };

    storage.push(shortened);
  }

  deleteUrl(id: string) {
    const url = this.currentStorage.find((x) => x.id === id);
    if (url) {
      url.deleted = true;
    }
  }
}

export const ShortenerContext = createContext<Shortener>(new Shortener());

export default Shortener;
