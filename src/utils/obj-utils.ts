export function clone(data: any): any {
    return JSON.parse(JSON.stringify(data));
  }
  
  export function lastArrayElement(arr: any[]): any {
    if (arr.length) return arr[arr.length - 1];
  }
  
  export function arrSum(arr: number[]) {
    return arr.reduce((sum: number, el: number) => sum + el);
  }
  
  export function average(arr: number[]) {
    return arrSum(arr) / arr.length;
  }
  
  export function mapObject(obj: any, callback: (val: any, key: string) => any) {
    if (typeof obj !== "object" || obj === null) throw new Error(`wrong type of mapped object - ${typeof obj}`);
    const res: any = {};
    // eslint-disable-next-line
    Object.entries(obj).forEach(entry => {
      const [key, val] = entry;
      res[key] = callback.call(null, val, key);
    });
    return res;
  }
  
  export function removeKeys(obj: any, keysToRemove: string[]) {
    const res: any = {};
    Object.keys(obj).forEach(k => {
      if (keysToRemove.includes(k)) return;
      res[k] = obj[k];
    });
    return res;
  }
  export function leaveKeys(obj: any, keysToLeave: string[]) {
    const res: any = {};
    Object.keys(obj).forEach(k => {
      if (!keysToLeave.includes(k)) return;
      res[k] = obj[k];
    });
    return res;
  }
  
  /** Converts complicated nested object to flat one, replacing
   * nested objects by theirs "id" or "sysName". For example:
   * {addr:{sysName:"Mos", name: "Moscow"}, user: {id: 1, name: "Mike"}, value: 2}
   * will be converted to {addrSysName:"Mos", userId: 1, value: 2}
   */
  export function toWritable(obj: any) {
    const res: any = {};
    Object.keys(obj).forEach(k => {
      const val: any = obj[k];
      if (val && typeof val === "object" && !Array.isArray(val)) {
        if (val.id !== undefined) {
          res[k + "Id"] = val.id;
        } else if (val.sysName !== undefined) {
          res[k + "SysName"] = val.sysName;
        } else {
          res[k] = val;
        }
      } else {
        res[k] = val;
      }
    });
    return res;
  }
  
  export function notNullCount(obj: any): number {
    const arr = obj instanceof Array ? obj : Object.values(obj);
    return arr.filter(val => val !== null && val !== undefined).length;
  }
  export function objIsEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }
  