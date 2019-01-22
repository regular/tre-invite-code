const {parse, stringify} = require('.')
const test = require('tape')

test('with autoname', t => {
  const compact = "*kWFhOEuLiics3Po/Taio9jyGPK9mKfndrDt23s5vFvE=.ed25519@h8sMNhOo43PP8HX+9B3PCJPchqxhpPXgzwFG7HIaNbc=.ed25519%lvxLQlIDhbfZKYRIZgLYAFDW30d7poZctZoAc1x9DBo=.sha256138.201.131.83:52654:@MODsaDg5OpsFlca7LLSLxikxFGze4DN0xbAzvrz7uMQ=.ed25519~FYa22Lvd/Wl/o5MlPJ0XkAgSQIoQErN41/IxJPtvu+k='cmVndWxhciBnb256YWxlcw=="

  const p = parse(compact)
  t.equal( p.autoname, "regular gonzales")
  t.equal( p.autoinvite, "138.201.131.83:52654:@MODsaDg5OpsFlca7LLSLxikxFGze4DN0xbAzvrz7uMQ=.ed25519~FYa22Lvd/Wl/o5MlPJ0XkAgSQIoQErN41/IxJPtvu+k=")
  t.equal( p.boot, "%lvxLQlIDhbfZKYRIZgLYAFDW30d7poZctZoAc1x9DBo=.sha256")
  t.equal( p.autofollow, "@h8sMNhOo43PP8HX+9B3PCJPchqxhpPXgzwFG7HIaNbc=.ed25519")
  t.equal( p.network, "*kWFhOEuLiics3Po/Taio9jyGPK9mKfndrDt23s5vFvE=.ed25519")
    
  t.end()
})

test('without autoname', t => {
  const compact = "*kWFhOEuLiics3Po/Taio9jyGPK9mKfndrDt23s5vFvE=.ed25519@h8sMNhOo43PP8HX+9B3PCJPchqxhpPXgzwFG7HIaNbc=.ed25519%lvxLQlIDhbfZKYRIZgLYAFDW30d7poZctZoAc1x9DBo=.sha256138.201.131.83:52654:@MODsaDg5OpsFlca7LLSLxikxFGze4DN0xbAzvrz7uMQ=.ed25519~FYa22Lvd/Wl/o5MlPJ0XkAgSQIoQErN41/IxJPtvu+k="

  const p = parse(compact)
  t.notOk( p.autoname )
  t.equal( p.autoinvite, "138.201.131.83:52654:@MODsaDg5OpsFlca7LLSLxikxFGze4DN0xbAzvrz7uMQ=.ed25519~FYa22Lvd/Wl/o5MlPJ0XkAgSQIoQErN41/IxJPtvu+k=")
  t.equal( p.boot, "%lvxLQlIDhbfZKYRIZgLYAFDW30d7poZctZoAc1x9DBo=.sha256")
  t.equal( p.autofollow, "@h8sMNhOo43PP8HX+9B3PCJPchqxhpPXgzwFG7HIaNbc=.ed25519")
  t.equal( p.network, "*kWFhOEuLiics3Po/Taio9jyGPK9mKfndrDt23s5vFvE=.ed25519")

  t.end()
})

test('multiple autofollows', t => {
  const compact = "@h8sMNhOo43PP8HX+9B3PCJPchqxhpPXgzwFG7HIaNbd=.ed25519*kWFhOEuLiics3Po/Taio9jyGPK9mKfndrDt23s5vFvE=.ed25519@h8sMNhOo43PP8HX+9B3PCJPchqxhpPXgzwFG7HIaNbc=.ed25519%lvxLQlIDhbfZKYRIZgLYAFDW30d7poZctZoAc1x9DBo=.sha256138.201.131.83:52654:@MODsaDg5OpsFlca7LLSLxikxFGze4DN0xbAzvrz7uMQ=.ed25519~FYa22Lvd/Wl/o5MlPJ0XkAgSQIoQErN41/IxJPtvu+k="

  const p = parse(compact)
  t.notOk( p.autoname )
  t.equal( p.autoinvite, "138.201.131.83:52654:@MODsaDg5OpsFlca7LLSLxikxFGze4DN0xbAzvrz7uMQ=.ed25519~FYa22Lvd/Wl/o5MlPJ0XkAgSQIoQErN41/IxJPtvu+k=")
  t.equal( p.boot, "%lvxLQlIDhbfZKYRIZgLYAFDW30d7poZctZoAc1x9DBo=.sha256")
  t.deepEqual( p.autofollow.sort(), [
    "@h8sMNhOo43PP8HX+9B3PCJPchqxhpPXgzwFG7HIaNbc=.ed25519",
    "@h8sMNhOo43PP8HX+9B3PCJPchqxhpPXgzwFG7HIaNbd=.ed25519"
  ])
  t.equal( p.network, "*kWFhOEuLiics3Po/Taio9jyGPK9mKfndrDt23s5vFvE=.ed25519")
  t.end()
})

test('stringify', t => {

  const compact = stringify({
    autoinvite: "138.201.131.83:52654:@MODsaDg5OpsFlca7LLSLxikxFGze4DN0xbAzvrz7uMQ=.ed25519~FYa22Lvd/Wl/o5MlPJ0XkAgSQIoQErN41/IxJPtvu+k=",
    boot: "%lvxLQlIDhbfZKYRIZgLYAFDW30d7poZctZoAc1x9DBo=.sha256",
    autofollow: [
      "@h8sMNhOo43PP8HX+9B3PCJPchqxhpPXgzwFG7HIaNbc=.ed25519",
      "@h8sMNhOo43PP8HX+9B3PCJPchqxhpPXgzwFG7HIaNbd=.ed25519"
    ],
    network: "*kWFhOEuLiics3Po/Taio9jyGPK9mKfndrDt23s5vFvE=.ed25519"
  })

  t.equal(compact, "*kWFhOEuLiics3Po/Taio9jyGPK9mKfndrDt23s5vFvE=.ed25519@h8sMNhOo43PP8HX+9B3PCJPchqxhpPXgzwFG7HIaNbc=.ed25519@h8sMNhOo43PP8HX+9B3PCJPchqxhpPXgzwFG7HIaNbd=.ed25519%lvxLQlIDhbfZKYRIZgLYAFDW30d7poZctZoAc1x9DBo=.sha256138.201.131.83:52654:@MODsaDg5OpsFlca7LLSLxikxFGze4DN0xbAzvrz7uMQ=.ed25519~FYa22Lvd/Wl/o5MlPJ0XkAgSQIoQErN41/IxJPtvu+k=")

  t.end()
})

test('three-letter-name', t => {

  const o = {
    autoname: 'tre',
    autoinvite: "138.201.131.83:52654:@MODsaDg5OpsFlca7LLSLxikxFGze4DN0xbAzvrz7uMQ=.ed25519~FYa22Lvd/Wl/o5MlPJ0XkAgSQIoQErN41/IxJPtvu+k=",
    boot: "%lvxLQlIDhbfZKYRIZgLYAFDW30d7poZctZoAc1x9DBo=.sha256",
    autofollow: "@h8sMNhOo43PP8HX+9B3PCJPchqxhpPXgzwFG7HIaNbd=.ed25519",
    network: "*kWFhOEuLiics3Po/Taio9jyGPK9mKfndrDt23s5vFvE=.ed25519"
  }

  t.deepEqual(parse(stringify(o)), o)
  t.end()
})

test('four-letter-name', t => {

  const o = {
    autoname: 'vier',
    autoinvite: "138.201.131.83:52654:@MODsaDg5OpsFlca7LLSLxikxFGze4DN0xbAzvrz7uMQ=.ed25519~FYa22Lvd/Wl/o5MlPJ0XkAgSQIoQErN41/IxJPtvu+k=",
    boot: "%lvxLQlIDhbfZKYRIZgLYAFDW30d7poZctZoAc1x9DBo=.sha256",
    autofollow: "@h8sMNhOo43PP8HX+9B3PCJPchqxhpPXgzwFG7HIaNbd=.ed25519",
    network: "*kWFhOEuLiics3Po/Taio9jyGPK9mKfndrDt23s5vFvE=.ed25519"
  }

  t.deepEqual(parse(stringify(o)), o)
  t.end()
})

test('random netkey', t => {

  const o = {
    autoname: 'vier',
    autoinvite: "138.201.131.83:52654:@MODsaDg5OpsFlca7LLSLxikxFGze4DN0xbAzvrz7uMQ=.ed25519~FYa22Lvd/Wl/o5MlPJ0XkAgSQIoQErN41/IxJPtvu+k=",
    boot: "%lvxLQlIDhbfZKYRIZgLYAFDW30d7poZctZoAc1x9DBo=.sha256",
    autofollow: "@h8sMNhOo43PP8HX+9B3PCJPchqxhpPXgzwFG7HIaNbd=.ed25519",
    network: "*kWFhOEuLiics3Po/Taio9jyGPK9mKfndrDt23s5vFvE=.random"
  }

  const compact = stringify(o)
  console.log('compact', compact)
  t.deepEqual(parse(compact), o)
  t.end()
})
