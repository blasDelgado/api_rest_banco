import { Model, DataTypes } from 'sequelize';
import bd from '../datebase';

export interface IPrestamo {
  id_prestamo: number | null | undefined;
  id_cliente: number;
  cantidad_prestada: number;
  cantidad_adeudada: number;
  fecha_de_otorgamiento: Date;
  fecha_de_vencimiento: Date | null | undefined;
  id_sucursal_emisora: number;
}

export default class Prestamo extends Model<IPrestamo> {}

Prestamo.init(
  {
    id_prestamo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad_prestada: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad_adeudada: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_de_otorgamiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_de_vencimiento: {
      type: DataTypes.DATE,
    },
    id_sucursal_emisora: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: bd, tableName: 'prestamo' }
);
