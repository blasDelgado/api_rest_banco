import { Model, ModelStatic } from 'sequelize/types';

export default class AgregarRelaciones {
  //Crea una relacion entre dos modelos de 1 a 1.
  static crearRelacionUnoAUno(
    m1: ModelStatic<Model>,
    m2: ModelStatic<Model>,
    fk: string,
    fk2?: string
  ) {
    if (fk2) {
      m1.hasOne(m2, { foreignKey: fk });
      m2.hasOne(m1, { foreignKey: fk2 });
    } else {
      m1.hasOne(m2, { foreignKey: fk });
      m2.hasOne(m1, { foreignKey: fk });
    }
  }
}
