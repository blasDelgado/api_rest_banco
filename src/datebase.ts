import { Sequelize } from 'sequelize';
import { host, password , user } from './config';

const sequelize = new Sequelize('banco_del', user , password, {
  host: host,
  dialect: 'mysql',

  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

export default sequelize;
