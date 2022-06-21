import { Model, ModelStatic } from 'sequelize/types';
import Cliente from '../model/cliente';
import Cuenta from '../model/cuenta';
import Depositos from '../model/depositos';
import Extracciones from '../model/extracciones';
import Prestamo from '../model/prestamo';
import Sucursal from '../model/sucursal';

agregarRelacion(Cliente, Cuenta, 'numero_de_cuenta');
agregarRelacion(Cliente, Sucursal, 'id_sucursal');
agregarRelacion(Cuenta, Prestamo, 'id_prestamo');
agregarRelacion(Cuenta, Depositos, 'numero_de_cuenta');
agregarRelacion(Cuenta, Extracciones, 'numero_de_cuenta');
agregarRelacion(Prestamo, Sucursal, 'id_sucursal', 'id_sucursal_emisora');

//Funcion que crea una relacion entre dos modelos de 1 a 1.
function agregarRelacion(
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

export { Cliente, Cuenta, Depositos, Extracciones, Prestamo, Sucursal };
