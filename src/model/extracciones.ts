import { Model, DataTypes } from 'sequelize';
import bd from '../datebase';

export interface IExtracciones {
  id_extraccion: number | undefined;
  monto_extraido: number;
  fecha_de_extraccion: Date;
  numero_de_cuenta: number;
}

export default class Extracciones extends Model<IExtracciones> {}

Extracciones.init(
  {
    id_extraccion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    monto_extraido: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_de_extraccion: {
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
    tableName: 'extracciones',
  }
);
