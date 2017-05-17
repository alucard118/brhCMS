var express=require('express');
var app=express();
var path=require('path');
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);
var bodyParser=require('body-parser');


app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'sessionbrh',
    cookie: { maxAge: 60000*15 },
    resave: false,
    saveUninitialized:false,
    store:new MongoStore({url:'mongodb://brhcms:ccfinfo2@localhost:27017/brhCms',
	touchAfter: 24 * 3600
	})
}));
app.use(function(req, res, next){
req.session._garbage = Date();
req.session.touch();
next();
});

var indexRouter=require('./routes/index');
var programRouter=require('./routes/program');
var speakersRouter=require('./routes/speakers');
var sponsorsRouter=require('./routes/sponsors');
var loginRouter=require('./routes/login');
var adminRouter=require('./routes/admin');
var nopreveligeRouter=require('./routes/noprevelige')




app.set('views',path.join(__dirname,'views/template1'));
app.set('view engine','ejs');





app.use(express.static(path.join(__dirname,'public')));

app.use('/',indexRouter);
app.use('/program',programRouter);
app.use('/speakers',speakersRouter);
app.use('/sponsors',sponsorsRouter);
app.use('/login',loginRouter);
app.use('/admin',adminRouter);
app.use('/noprevelige',nopreveligeRouter);





app.listen(3000,'localhost',function () {
	console.log('app is running on port 3000');
})