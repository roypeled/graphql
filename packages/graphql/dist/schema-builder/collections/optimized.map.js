"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizedMap = void 0;
const crypto_1 = require("crypto");
const MAX_BUCKET_SIZE = 10000;
class OptimizedMap {
    constructor() {
        this.singleBucketMap = new Map();
        this.bucketedMapArrays = new Map();
        this.isBucketed = false;
    }
    get [Symbol.toStringTag]() {
        return this.singleBucketMap[Symbol.toStringTag];
    }
    get size() {
        if (!this.isBucketed)
            return this.singleBucketMap.size;
        return [...this.bucketedMapArrays.values()].reduce((total, arr) => total + arr.length, 0);
    }
    [Symbol.iterator]() {
        return this.singleBucketMap[Symbol.iterator]();
    }
    clear() {
        if (!this.isBucketed)
            this.singleBucketMap.clear();
        this.bucketedMapArrays = new Map();
    }
    delete(key) {
        if (!this.isBucketed)
            return this.singleBucketMap.delete(key);
        const bucket = this.getBucket(key);
        const index = bucket.findIndex((item) => item.__id === key);
        if (index >= 0) {
            bucket.splice(index, 1);
            return true;
        }
        return false;
    }
    entries() {
        if (!this.isBucketed)
            return this.singleBucketMap.entries();
        function* valuesIter(map) {
            const arrays = [...map.values()];
            let array = arrays.shift();
            while (array) {
                let i = 0;
                while (array[i]) {
                    yield [array[i].__id, array[i]];
                    i++;
                }
                array = arrays.shift();
            }
        }
        return valuesIter(this.bucketedMapArrays);
    }
    forEach(callbackfn, thisArg) {
        if (!this.isBucketed)
            this.singleBucketMap.forEach(callbackfn, thisArg);
        this.bucketedMapArrays.forEach((arr) => arr.forEach((val, key) => callbackfn(val, val.__id, null), thisArg));
    }
    get(key) {
        var _a;
        if (!this.isBucketed)
            return this.singleBucketMap.get(key);
        return (_a = this.getBucket(key)) === null || _a === void 0 ? void 0 : _a.find((item) => item.__id === key);
    }
    has(key) {
        if (!this.isBucketed)
            return this.singleBucketMap.has(key);
        return Boolean(this.get(key));
    }
    keys() {
        if (!this.isBucketed)
            return this.singleBucketMap.keys();
        function* valuesIter(map) {
            const arrays = [...map.values()];
            let array = arrays.shift();
            while (array) {
                let i = 0;
                while (array[i]) {
                    yield array[i].__id;
                    i++;
                }
                array = arrays.shift();
            }
        }
        return valuesIter(this.bucketedMapArrays);
    }
    set(key, value) {
        if (this.singleBucketMap.size > MAX_BUCKET_SIZE) {
            this.transformToBucketed();
        }
        if (!this.isBucketed)
            this.singleBucketMap.set(key, value);
        else {
            const valueWithId = Object.assign(value, { __id: key });
            if (!this.has(key))
                this.getBucket(key).push(valueWithId);
        }
        return this;
    }
    values() {
        if (!this.isBucketed)
            return this.singleBucketMap.values();
        function* valuesIter(map) {
            const arrays = [...map.values()];
            let array = arrays.shift();
            while (array) {
                let i = 0;
                while (array[i]) {
                    yield array[i];
                    i++;
                }
                array = arrays.shift();
            }
        }
        return valuesIter(this.bucketedMapArrays);
    }
    getAllAsArray() {
        if (!this.isBucketed)
            return [...this.singleBucketMap.values()];
        return [...this.bucketedMapArrays.values()].flat();
    }
    transformToBucketed() {
        if (this.isBucketed)
            return;
        this.isBucketed = true;
        this.singleBucketMap.forEach((value, key) => this.set(key, value));
        this.singleBucketMap.clear();
    }
    keyToHash(key) {
        return (0, crypto_1.createHash)('md5')
            .update(key.toString().slice(0, 10))
            .digest('hex')
            .slice(0, 2);
    }
    getBucket(key) {
        const hashedKey = this.keyToHash(key);
        if (!this.bucketedMapArrays.has(hashedKey)) {
            this.bucketedMapArrays.set(hashedKey, []);
        }
        return this.bucketedMapArrays.get(hashedKey);
    }
}
exports.OptimizedMap = OptimizedMap;
