var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Yay we are connection");
});

var toDoSchema = mongoose.Schema({
    due_date:     Date,
    timestamp:    { type: Date, default: Date.now },
    description:  String,
    title:        String,
    priority:      Number,
    complete:     Boolean
});

var ToDo = mongoose.model('ToDo', toDoSchema);
var firstToDo = new ToDo({
  due_date: Date.now(),
  description:  "Do something",
  title:        "Do it now",
  priority:      10,
  complete:      false

});

firstToDo.save(function (err, first) {
  if (err){ 
           return console.error(err);
          }
  console.log(first);
});


//POST form **

router.post('/', function(req, res){
   new toDo({
    due_date :    req.body.due_date,
    todo_task :   req.body.task,
    description : req.body.description,
    priority:     req.body.priority,
    //complete : false


   }).save(function(err, task){
    if(err){return console.error(err);}
    console.log(task);
   });
res.redirect('todo');

});

//module.exports = router;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
