declare module "crypto" {
  interface randomUUIDOptions {
    /**
     * To generate a UUID without using the cache.
     */
    disableEntropyCache: boolean;
  }

  function randomUUID(options?: randomUUIDOptions): string;
}
