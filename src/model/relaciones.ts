import { Model, ModelStatic } from 'sequelize/types';
import Cliente from '../model/cliente';
import Cuenta from '../model/cuenta';
import Depositos from '../model/depositos';
import Extracciones from '../model/extracciones';
import Prestamo from '../model/prestamo';
import Sucursal from '../model/sucursal';
import CreaRelaciones from '../utils/creador-de-realciones';

CreaRelaciones.agregarRelacionUnoAUno(Cliente, Cuenta, 'numero_de_cuenta');
CreaRelaciones.agregarRelacionUnoAUno(Cliente, Sucursal, 'id_sucursal');
CreaRelaciones.agregarRelacionUnoAUno(Cuenta, Prestamo, 'id_prestamo');
CreaRelaciones.agregarRelacionUnoAUno(Cuenta, Depositos, 'numero_de_cuenta');
CreaRelaciones.agregarRelacionUnoAUno(Cuenta, Extracciones, 'numero_de_cuenta');
CreaRelaciones.agregarRelacionUnoAUno(
  Prestamo,
  Sucursal,
  'id_sucursal',
  'id_sucursal_emisora'
);

export { Cliente, Cuenta, Depositos, Extracciones, Prestamo, Sucursal };
