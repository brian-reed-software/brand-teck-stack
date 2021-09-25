import { useState } from 'react'
import Head from 'next/head'
export default function Home() {
  const [prices, setPrices] = useState([]);
  async function getPrices(e): Promise<void> {
    e.preventDefault() // prevent page from submitting form
    const result = await (await fetch('/api/hello')).text()
    setPrices(prices.concat(result))
  }
  function getValue(name: string): string {
    const elements = document.getElementsByTagName('form')[0].elements
    const element = elements.namedItem(name) as HTMLInputElement
    return element.value || element.dataset.default
  }
  async function fetcher(data: object) {
    const res = await fetch('/api/prices', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    return await res.text()
  }
  async function getPrices(e): Promise<void> {
    e.preventDefault()
    const result = await fetcher({
      currency: getValue('currency'),
      exchange: getValue('exchange'),
      symbol: getValue('symbol'),
    })
    setPrices(prices.concat(result))
  }
  return (
    <div className="container">
      <Head>
        <title>Crypto Prices</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h3 className="title"> Crypto Prices </h3>
        <div className="grid">
          <div className="form card">
            <form lang="en">
              <div>
                <div>
                  <label htmlFor="symbol">Symbol:</label>
                  <input type="text" id="symbol" name="symbol" data-default="BTC" placeholder="BTC" />
                </div>
                <div>
                  <label htmlFor="currency">Currency:</label>
                  <input type="text" id="currency" name="currency" data-default="USD" placeholder="USD" />
                </div>
                <div>
                  <label htmlFor="exchange">Exchange:</label>
                  <input type="text" id="exchange" name="exchange" data-default="Kraken" placeholder="Kraken" />
                </div>
              </div>
              <div className="submit">
                <button className="submit" onClick={getPrices}>Get Prices</button> &rarr;
              </div>
            </form>
          </div>
          <div className="code card">
            <ul>
              {prices.map((price, i) => <li key={i}><code>{price}</code></li>)}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}