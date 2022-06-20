import { Model, DataTypes } from 'sequelize';
import bd from '../datebase';

interface IPrestamo {
  id_prestamo: Number | null | undefined;
  id_cliente: Number;
  cantidad_prestada: Number;
  cantidad_adeudada: Number;
  fecha_de_otorgamiento: Date;
  fecha_de_vencimiento: Date | null | undefined;
  id_sucursal_emisora: Number;
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
