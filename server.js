// Build from these examples:
//    https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
//    http://www.smashingmagazine.com/2015/04/08/web-scraping-with-nodejs/
var express = require('express')
var request = require('request')
var cheerio = require('cheerio')
var bodyParser = require('body-parser')

var app = express()
var port = process.env.PORT || 8080
var router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.get('/', function (req, res) {
  res.json({ message: 'Universal Webscraper Service is up!' })
})

router.post('/scrape', function (req, res) {
  var selected
  request(req.body.url, function (error, response, body) {
    if (!error) {
      var $ = cheerio.load(body)
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
