import { Sequelize } from 'sequelize';
import { password } from './config';

const sequelize = new Sequelize('banco_del', 'root', password, {
  host: 'localhost',
  dialect: 'mysql',

  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

export default sequelize;
