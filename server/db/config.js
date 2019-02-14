const pg = require('pg');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('hobbyist', process.env.DB_USER, process.env.DP_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING // needs hashing
});

const Event = sequelize.define('event', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category: Sequelize.STRING,
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  time: Sequelize.DATE,
  lat: Sequelize.NUMERIC,
  long: Sequelize.NUMERIC,
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

sequelize.sync();
