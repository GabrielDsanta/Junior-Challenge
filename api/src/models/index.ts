import { Sequelize } from 'sequelize-typescript';
import { Ring } from './ring';
import { User } from './user';

const env = process.env.ENV || 'development';
const config = require(__dirname + '/../database/config/config.js')[env];

const connection = new Sequelize({
  ...config,
  models: [Ring, User],
});

export { Ring, User };

export default connection;
