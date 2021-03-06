function parse(compact) {
  const m = compact.match(/^((?:[*%@][a-zA-Z0-9/+]{43}=\.(?:ed25519|sha256|random))+)([^']+)('[a-zA-Z0-9/+]+={0,2})?$/)
  if (!m) return
  const [_, fixed, autoinvite, autoname] = m

  const result = {}
  fixed.replace(/[*%@][a-zA-Z0-9/+]{43}=\.(?:ed25519|sha256|random)/g, ref => {
    result[ref[0]] = (result[ref[0]] || []).concat(ref)
    return ''
  })

  const parsed = {
    autofollow: unarr(result['@']),
    boot: unarr(result['%']),
    network: unarr(result['*']),
    autoinvite
  }
  if (autoname) {
    parsed.autoname =  Buffer.from(autoname.slice(1), 'base64').toString()
  }
  return parsed
}

function stringify(invite) {
  const {autoname, autoinvite, autofollow, network, boot} = invite

  let compact = `${network}${flatten(autofollow)}${boot}${autoinvite}`
  if (autoname) compact += "'" + Buffer.from(autoname, 'utf8').toString('base64')
  return compact
}

function flatten(a) {
  if (Array.isArray(a)) return a.join('')
  return a
}

function unarr(arr) {
  if (arr == undefined) return undefined
  return arr.length == 1 ? arr[0] : arr
}

module.exports = {parse, stringify}
