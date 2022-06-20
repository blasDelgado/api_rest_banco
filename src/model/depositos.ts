import { Model, DataTypes } from 'sequelize';
import bd from '../datebase';

interface IDepositos {
  id_deposito: Number | null | undefined;
  monto_depositado: Number;
  fecha_de_deposito: Date;
  numero_de_cuenta: Number;
}

export default class Depositos extends Model<IDepositos> {}

Depositos.init(
  {
    id_deposito: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    monto_depositado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_de_deposito: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    numero_de_cuenta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: bd,
    tableName: 'depositos',
  }
);
