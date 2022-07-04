import { Model, ModelStatic } from 'sequelize/types';
import Cliente from '../model/cliente';
import Cuenta, { ICuenta } from '../model/cuenta';
import Depositos from '../model/depositos';
import Extracciones from '../model/extracciones';
import Prestamo from '../model/prestamo';
import Sucursal from '../model/sucursal';
import AgregarRelaciones from '../clases/para_model/creador-de-realciones';

AgregarRelaciones.crearRelacionUnoAUno(Cliente, Cuenta, 'numero_de_cuenta');
AgregarRelaciones.crearRelacionUnoAUno(Cliente, Sucursal, 'id_sucursal');
AgregarRelaciones.crearRelacionUnoAUno(Cuenta, Prestamo, 'id_prestamo');
AgregarRelaciones.crearRelacionUnoAUno(Cuenta, Depositos, 'numero_de_cuenta');
AgregarRelaciones.crearRelacionUnoAUno(
  Cuenta,
  Extracciones,
  'numero_de_cuenta'
);
AgregarRelaciones.crearRelacionUnoAUno(
  Prestamo,
  Sucursal,
  'id_sucursal',
  'id_sucursal_emisora'
);

export { Cliente, Cuenta, Depositos, Extracciones, Prestamo, Sucursal };
