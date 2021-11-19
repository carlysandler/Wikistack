const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

app.use(morgan("dev")); //logging middleware
app.use(express.static(path.join(__dirname, './public'))); //serving up static files
app.use(express.urlencoded( {extended: false})); //parsing middleware for form input data
app.use(express.json());
app.use(require('method-override')('_method'));

app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/users'));



// db.authenticate()
// .then(() => {
//   console.log('connected to the database');
// })



app.get('/', (req, res) => {
  res.redirect('/wiki/');
});

// const init = async () => {
//   await Page.sync({force: true});
//   await User.sync({force: true});

//   const PORT = 3000;
//   app.listen(PORT, () => {
//     console.log(`App listening in port ${PORT}`);

//   });
// }


// init();

module.exports = app;
