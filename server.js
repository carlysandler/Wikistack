const {db, Page, User} = require('./models');
const app = require('./app');

const PORT = 3000;

const init = async () => {
  try {
    await db.sync();

    app.listen(PORT, () => {
      console.log(`Listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server: ', err);
  }
};

init();
