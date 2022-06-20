import { Model, DataTypes } from 'sequelize';
import bd from '../datebase';

interface IExtracciones {
  id_extraccion: Number | null | undefined;
  monto_extraido: Number;
  fecha_de_extraccion: Date;
  numero_de_cuenta: Number;
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
