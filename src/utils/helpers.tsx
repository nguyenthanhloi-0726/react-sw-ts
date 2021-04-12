const sleep = (time: number): Promise<number> =>
  new Promise(resolve => setTimeout(resolve, time))

const isArray = (arr: any): boolean => Array.isArray(arr)

const isObject = (obj: any): boolean =>
  obj && typeof obj === 'object' && !Array.isArray(obj)

const ensureArray = (arr: any, defaultValue?: []): [] =>
  isArray(arr) ? arr : defaultValue

const ensureObject = (obj: any, defaultValue?: {}): {} =>
  isObject(obj) ? obj : defaultValue

//TODO: handle error
const errorHandle = (error: any) => {
  console.log(error)
  return error
}

export { sleep, isArray, isObject, ensureArray, ensureObject, errorHandle }
