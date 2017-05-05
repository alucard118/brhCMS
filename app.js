var express=require('express');
var app=express();
var path=require('path');

var bodyParser=require('body-parser');


app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

var indexRouter=require('./routes/index');
var programRouter=require('./routes/program');
var speakersRouter=require('./routes/speakers');
var sponsorsRouter=require('./routes/sponsors');
var loginRouter=require('./routes/login');
var adminRouter=require('./routes/admin');




app.set('views',path.join(__dirname,'views/template1'));
app.set('view engine','ejs');


app.use(express.static(path.join(__dirname,'public')));

app.use('/',indexRouter);
app.use('/program',programRouter);
app.use('/speakers',speakersRouter);
app.use('/sponsors',sponsorsRouter);
app.use('/login',loginRouter);
app.use('/admin',adminRouter);





app.listen(3000,function () {
	console.log('app is running on port 3000');
})