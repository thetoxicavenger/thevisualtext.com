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
    let isMatch = false
    let data = {}
    for (var i = 0; i < objects.length; i++) {
      const object = objects[i]
      const { slug } = object
      if (slug === req.params.slug) {
        isMatch = true
        data = {
          title: object.title,
          created_at: object.created_at.split('T')[0],
          author: object.metadata.author,
          featuredImageUrl: object.metadata.featuredimage.url,
          content: object.metadata.content,
        }
        break
      }
    }
    if (isMatch) {
      res.render('blog/post', { data })
    } else {
      res.status(404);
      res.render('error', {
        message: '404 - Post not found.'
      });
    }
  })
  .catch(error => {
    res.status(error.status || 500);
    res.render('error', {
      message: 'Not able to load post data. This is probably due to a data issue with our blog provider. Please send us an email letting us know of this outage.',
    });
  })
}
