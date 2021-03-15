if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ExpressError = require('./utils/ExpressError');
const { campgroundSchema, reviewSchema } = require('./schemas.js');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
    
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine','ejs')
app.set('views', path.join(__dirname, '/views'));

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());

const sessionConfig = {
    secret: 'Thisshouldbeasecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    } 
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// put this before your middleware
app.get("/favicon.ico", (req, res) => {
    res.sendStatus(404);
    // or instead of a 404, send an actual favicon.ico file
    // just don't let routing continue to your middleware
});

app.use((req, res, next) => {
    if (!['/login', '/register', '/'].includes(req.originalUrl)) {
        // console.log(req.originalUrl);
        req.session.returnTo = req.originalUrl;
    }
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);


app.get('/', (req, res) => {
    res.render('home')
});



app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found!', 404));
})

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = 'Something went Wrong';
    res.status(status).render('error', { err });
})


app.listen(3000, () => {
    console.log('Listening on port 3000!');
});