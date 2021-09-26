async function get(req, res): Promise<any> {
    return 'Helpful information'
  }
  async function external(url: string, config?: object): Promise<any> {
    const res = await fetch(url, config)
    const data = await res.json()
    return data
  }
  async function post(req, res): Promise<any> {
    const params = {
      denominator: req.body.results
    };
    const priceUrl = new URL('https://brand-recognition.p.rapidapi.com/v1/results');
    priceUrl.search = (new URLSearchParams(params)).toString();
    const remoteResponse = await external(
      priceUrl.toString(),
      {
        headers: {
          'x-rapidapi-host': 'brand-recognition.p.rapidapi.com',
          'x-rapidapi-key': '1f9828dd2fmsh8acb22645d8732dp1bf4b6jsnea031b0959b4',
        }
      }
    )
    const response = Object.assign({
      currency: req.body.currency
    }, remoteResponse)
    return response
  }
  export default async function (req, res): Promise<any> {
    switch (req.method) {
      case 'GET':
        res.status(200).send(await get(req, res))
        break
      case 'POST':
        res.status(200).json(await post(req, res))
        break
      default:
        res.status(405).end() //Method Not Allowed
    }
  }