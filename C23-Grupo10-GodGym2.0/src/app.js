require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const session = require('express-session')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require("method-override");
const cors = require('cors')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products')
const cookieValidate = require('./middlewares/cookieValidate');
const app = express();
// RUTAS DE API
const productApiRouter = require('./routes/apiRoute/productApiRoute')
const userApiRouter = require('./routes/apiRoute/userApiRoute')
const categoryApiRouter = require('./routes/apiRoute/categoryApiRoute')
// view engine setup

app.use(cors({
  origin: "http://localhost:5173"
}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(session({secret:"GOD GYM",
resave: false,
saveUninitialized: true,
}))

app.use(cookieValidate)


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter)
//API RUTAS
app.use('/api', productApiRouter)
app.use('/api', userApiRouter)
app.use("/api",categoryApiRouter)

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
  res.render('error');
});




module.exports = app;