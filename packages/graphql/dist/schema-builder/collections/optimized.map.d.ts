export declare class OptimizedMap<T, Y> implements Map<T, Y> {
  private singleBucketMap;
  private bucketedMapArrays;
  private isBucketed;
  get [Symbol.toStringTag](): string;
  get size(): number;
  [Symbol.iterator](): IterableIterator<[T, Y]>;
  clear(): void;
  delete(key: T): boolean;
  entries(): IterableIterator<[T, Y]>;
  forEach(
    callbackfn: (value: Y, key: T, map: Map<T, Y>) => void,
    thisArg?: any,
  ): void;
  get(key: T): Y | undefined;
  has(key: T): boolean;
  keys(): IterableIterator<T>;
  set(key: T, value: Y): this;
  values(): IterableIterator<Y>;
  getAllAsArray(): Y[];
  private transformToBucketed;
  private keyToHash;
  private getBucket;
}
//# sourceMappingURL=optimized.map.d.ts.map
