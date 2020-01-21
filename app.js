var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var postsRouter = require('./routes/posts');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(function(req, res, next) {
  res.io = io;
  next();
});

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send(`Hallo from blog of thought backend`));
app.use('/posts', postsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

// check io connection
io.on('connect', socket => {
  console.log(`socket.io is connected`);

  socket.on('disconnect', () => {
    console.log('socket.io is disconnect');
    socket.broadcast.emit('interupted', 'socket.io is disconnect');
  });
});

module.exports = { app: app, server: server };
