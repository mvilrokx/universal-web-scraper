const request = require('request')
const cheerio = require('cheerio')

const router = require('express').Router()

router.post('/scrape', (req, res, next) => {
  let selected
  request(req.body.url, (error, response, body) => {
    if (!error) {
      const $ = cheerio.load(body)
      if (req.body.attr) {
        selected = $(req.body.selector).attr(req.body.attr)
      } else {
        selected = $(req.body.selector).html()
      }
      res.json({ scraped: selected })
    } else {
      res.json({ error: error })
    }
  })
})

module.exports = router
