const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors())

const favouritesList = [];

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/getFavourites', (req, res) => {
    res.send(favouritesList);
})

app.post('/addFavourite', (req, res) => {
    const article = JSON.parse(JSON.stringify(req.body));

    if(favouritesList.includes(article.url)){
        res.send(favouritesList)
    }

    else {
        favouritesList.push(article.url);
        res.send(favouritesList); 
    }
    
})

app.listen(3001);