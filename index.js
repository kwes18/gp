var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({ defaultLayout:'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

//static middleware
app.use(express.static(__dirname + '/public'));

//array of quotes 
var quotes = [
    "\"The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart\". -Helen Keller",
    "\"Imagination is more important than knowledge\". - Albert Einstein",
    "\"Money can't buy life\". -Bob Marley",
    "\"When something is important enough, you do it even if the odds are not in your favor\". -Elon Musk",
    "\"Freedom lies in being bold\". -Robert Frost",
    "\"However difficult life may seem, there is always something you can do and succeed at\". -Stephen Hawking"
    ];
    
app.get('/', function(req, res) {
    res.render('home');
    });

app.get('/about', function(req, res) {
    var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        res.render('about', { quote: randomQuote });
    });
    
    // 404 catch-all handler (middleware)
    app.use(function(req, res, next){
    res.status(404);
    res.render('404');
    });

    // 500 error handler (middleware)
    app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
    });

app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' );
});