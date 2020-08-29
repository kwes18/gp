var quote = require('./lib/quote.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//local port or 3000
app.set('port', process.env.PORT || 3000);

//secure server info
app.disable('x-powered-by');

//static middleware
app.use(express.static(__dirname + '/public'));

//for dev testing 
app.use( (req, res, next) =>{
    res.locals.showTests = app.get('env') != 'production' &&
        req.query.test === '1';
    next();
})

//shows req headers info 
app.get('/headers', function(req,res){
    res.set('Content-Type','text/plain');
    var s = '';
    for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    res.send(s);
    });

//routes
app.get('/', (req, res) => {
    res.locals.metaTags = { 
        title: "Home", 
        description: "handmade wire wrapped gemstone jewelry shop",   
        keywords: "gemstone" 
    };
    res.render('home'); 
});

app.get('/about', (req, res) =>{
    res.render('about', {
        quote: quote.getQuote(),
        pageTestScript: 'qa/tests-about.js'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact');

});

app.get('/products/pendants', (req, res) => {
    res.render('products/pendants');
});

app.get('/products/request-custom-order', (req, res) =>{
    res.render('products/request-custom-order');
} );

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
    res.status(404).render('404');
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});