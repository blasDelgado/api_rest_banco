import { Model, DataTypes } from 'sequelize';
import bd from '../datebase';

interface ISucursal {
  id_sucursal: Number | null | undefined;
  nombre_sucursal: String;
  ciudad_sucursal: String;
  direccion_sucursal: String;
}

export default class Sucursal extends Model<ISucursal> {}

Sucursal.init(
  {
    id_sucursal: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre_sucursal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ciudad_sucursal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion_sucursal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: bd,
    tableName: 'sucursal',
  }
);
