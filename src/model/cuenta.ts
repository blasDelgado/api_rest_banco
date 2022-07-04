import { Model, DataTypes } from 'sequelize';
import bd from '../datebase';

export interface ICuenta {
  numero_de_cuenta: number | null;
  saldo: number;
  prestamos_pendientes: number;
  id_prestamo: number | null | null;
}

export default class Cuenta extends Model<ICuenta> {}

Cuenta.init(
  {
    numero_de_cuenta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    saldo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    prestamos_pendientes: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    id_prestamo: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: bd,
    tableName: 'cuenta',
  }
);
