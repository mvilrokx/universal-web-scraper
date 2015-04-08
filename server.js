// Build from these examples:
//    https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
//    http://www.smashingmagazine.com/2015/04/08/web-scraping-with-nodejs/
var express    = require('express');
var request    = require('request');
var cheerio    = require('cheerio');
var bodyParser = require('body-parser');

var app    = express();
var port   = process.env.PORT || 8080;
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'APP is UP!' });
});

router.post('/scrape', function(req, res) {
  request(req.body.url, function (error, response, body) {
    if (!error) {
      var $ = cheerio.load(body);
      var profileImgSrc = $(req.body.selector).attr('src');
      res.json({ imgSrc: profileImgSrc });
    } else {
      res.json({ error: error });
    }
  });
});

app.use('/api', router);

app.listen(port);

console.log('Magic happens on port ' + port);
