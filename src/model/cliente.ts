import { Model, DataTypes } from 'sequelize';
import bd from '../datebase';

interface ICliente {
  id_cliente: Number | null | undefined;
  nombre_cliente: String;
  apellido_cliente: String;
  telefono_cliente: Number;
  id_sucursal: Number;
  numero_de_cuenta: Number;
}

export default class Cliente extends Model<ICliente> {}

Cliente.init(
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
    },
  },
  {
    sequelize: bd,
    tableName: 'cliente',
  }
);
