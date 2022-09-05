export const isObject = (value) => {
  return typeof value === 'object'&& value !== null
}
export const isSWZ = (value) => {
  return value === 'SWZ'
}