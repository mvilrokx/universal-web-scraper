// Build from these examples:
//    https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
//    http://www.smashingmagazine.com/2015/04/08/web-scraping-with-nodejs/
const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 8080
const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.use( (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.get('/', (req, res) => {
  res.json({ message: 'Universal Webscraper Service is up!' })
})

router.post('/scrape', (req, res) => {
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

app.use('/api', router)

app.listen(port)

console.log('Magic happens on port ' + port)
