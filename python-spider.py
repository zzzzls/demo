import aiohttp
import asyncio
import time
import random


async def fetch(session):
    async with session.get(f'https://httpbin.org/delay/3?name={random.random()}', headers={
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh,zh-CN;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        "pragma": "no-cache",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    }) as f:
        r = await f.json()
        print(r['args']['name'])


async def main():
    s = time.time()
    async with aiohttp.ClientSession() as session:
        task = [asyncio.create_task(fetch(session)) for _ in range(400)]
        await asyncio.gather(*task)
    e = time.time()
    print(e-s)

asyncio.run(main())

