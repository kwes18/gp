//array of quotes 
var quotes = [
    "\"The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart\". -Helen Keller",
    "\"Imagination is more important than knowledge\". - Albert Einstein",
    "\"Money can't buy life\". -Bob Marley",
    "\"When something is important enough, you do it even if the odds are not in your favor\". -Elon Musk",
    "\"Freedom lies in being bold\". -Robert Frost",
    "\"However difficult life may seem, there is always something you can do and succeed at\". -Stephen Hawking"
    ];
exports.getQuote = function(){
var randomQuote = Math.floor(Math.random() * quotes.length);   
return quotes[randomQuote]; 
}
