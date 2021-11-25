import fetch from 'node-fetch'

async function sendReq(v) {
  let resp = await fetch("http://httpbin.org/delay/3?name=" + Math.random(), {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "zh,zh-CN;q=0.9,en;q=0.8",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded",
      "pragma": "no-cache",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "method": "get"
  })
  let r = await resp.json()
  console.log(r['args']['name'])
}

async function main() {
  let s = new Date().getTime()
  let tasks = []
  for (let i = 0; i <= 400; i++) {
    tasks.push(sendReq())
  }
  let result = await Promise.allSettled(tasks)
  let e = new Date().getTime()
  console.log((e - s)/1000);
}

main();
