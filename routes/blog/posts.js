const nodeFetch = require('node-fetch')
const _ = require('lodash')
const {join} = require('path')
const fetchErrorHelper = require(join(__dirname, '..', '..', 'helpers', 'fetchErrorHelper'))
module.exports = (req, res) => {
  const url = `https://api.cosmicjs.com/v1/thevisualtext?pretty=true&hide_metafields=true`
  nodeFetch(url)
  .then(fetchErrorHelper)
  .then(apiResponse => apiResponse.json())
  .then(apiResponse => {
    const objects = apiResponse.bucket.objects
    let data = _.map(objects, (object) => {
      let { slug, title, created_at } = object
      let { author, content, blurb  } = object.metadata
      if (object.metadata.legacypublishdate) {
        created_at = object.metadata.legacypublishdate
      }
      let featuredImageUrl = object.metadata.featuredimage.url
      created_at = created_at.split('T')[0]
      const postUrl = `/blog/post/${slug}`
      return {
        postUrl,
        title,
        created_at,
        author,
        content,
        featuredImageUrl,
        blurb,
      }
    })

    data = _.orderBy(data, ['created_at'], 'desc')

    res.render('blog/posts', {
      data,
     })
  })
  .catch(error => {
    console.log(error)
    res.status(error.status || 500);
    res.render('error', {
      message: 'Not able to load post data. This is probably due to a data issue with our blog provider. Please send us an email letting us know of this outage.',
    });
  })
}
