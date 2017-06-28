const nodeFetch = require('node-fetch')
const {join} = require('path')
const fetchErrorHelper = require(join(__dirname, 'fetchErrorHelper'))
module.exports = (req, res) => {
  const url = `https://api.simplecast.com/v1/podcasts/3156/episodes.json?api_key=sc_duo3Wgd6pmyNgrnpt28mBA`
  nodeFetch(url)
  .then(fetchErrorHelper)
  .then(apiResponse => apiResponse.json())
  .then(apiResponse => {
    res.send({ data: apiResponse })
  })
  .catch(networkError => {
    res.send({ error: true })
  })
}
