import { Model, DataTypes } from 'sequelize';
import bd from '../datebase';

interface ICuenta {
  numero_de_cuenta: Number | null | undefined;
  saldo: Number;
  prestamos_pendientes: Number;
  id_prestamo: Number | null | undefined;
}

export default class Cuenta extends Model<ICuenta> {}

Cuenta.init(
  {
    numero_de_cuenta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
