export function buildDataStringFromObject (obj) {
  let data = []
  for (let property in obj) {
    let encodedKey = encodeURIComponent(property)
    let encodedValue = encodeURIComponent(obj[property])
    data.push(encodedKey + "=" + encodedValue)
  }
  data = data.join("&")
  return data
}
