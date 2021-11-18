const express = require('express');
// const router = express.Router();
const app = express();
const morgan = require('morgan');
const { db, Page, User } = require('./models');

// const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users')

app.use('/wiki', require('./routes/wiki'));
db.authenticate()
.then(() => {
  console.log('connected to the database');
})

app.use(express.static('public'));
app.use(express.urlencoded( {extended: false}));

app.get('/', (req, res) => {
  res.redirect('/wiki');
});

const init = async () => {
  await Page.sync({force: true});
  await User.sync({force: true});

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);

  });
}


init();

