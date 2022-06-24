import { Model, DataTypes } from 'sequelize';
import bd from '../datebase';

export interface ICliente {
  id_cliente: number | undefined;
  nombre_cliente: string;
  apellido_cliente: string;
  telefono_cliente: number;
  id_sucursal: number;
  numero_de_cuenta: number | undefined;
}

export default class Cliente extends Model<ICliente> {}

Cliente.init(
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    nombre_cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido_cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_sucursal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numero_de_cuenta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: bd,
    tableName: 'cliente',
  }
);
