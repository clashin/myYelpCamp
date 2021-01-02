const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((res) => {
//         console.log('Mongoose Connection open !');
//     })
//     .catch((e) => {
//         console.log('Mongoose Error!');
//         console.log(e);
//     })

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine','ejs')
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('home')
});

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});