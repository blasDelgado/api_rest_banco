import { Sequelize } from 'sequelize';
import { password } from './config';

//contraseña ,nombre de base de datos y dialecto Variables globales
const sequelize = new Sequelize('banco_del', 'root', password, {
  host: 'localhost',
  dialect: 'mysql',

  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

export default sequelize;
