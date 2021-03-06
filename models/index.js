const Sequelize = require('sequelize');

const db = new Sequelize('wikistack', 'postgres', 'postgres', {
  dialect: 'postgres',
  logging: false,
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    // since we are searching, editing, deleting by slug, these need to be unique
    unique: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

// Add our hooks for changing the Title to Url friendly format
Page.beforeValidate((page) => {
  if (!page.slug) {
    page.slug = page.title.replace(/\s+/g, "_").replace(/\W/g, "").toLowerCase();
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true
  }
});

// This adds methods to 'Page', such as '.setAuthor'.
// It also creates a foreign key attribute on the Page table pointing ot the User table
Page.belongsTo(User, { as: "author"});

module.exports = {
  db,
  Page,
  User
};
