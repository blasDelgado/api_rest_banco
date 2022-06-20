import { Model, Sequelize } from 'sequelize/types';
import Cliente from '../model/cliente';
import Cuenta from '../model/cuenta';
import Depositos from '../model/depositos';
import Extracciones from '../model/extracciones';
import Prestamo from '../model/prestamo';
import Sucursal from '../model/sucursal';

// Relacion Cliente con Cuenta
Cliente.hasOne(Cuenta, { foreignKey: 'numero_de_cuenta' });
Cuenta.hasOne(Cliente, { foreignKey: 'numero_de_cuenta' });
// Relacion Cliente con Sucursal
Cliente.hasOne(Sucursal, { foreignKey: 'id_sucursal' });
Sucursal.hasOne(Cliente, { foreignKey: 'id_sucursal' });
//Relacion Cuenta con Prestamo
Cuenta.hasOne(Prestamo, { foreignKey: 'id_prestamo' });
Prestamo.hasOne(Cuenta, { foreignKey: 'id_prestamo' });
//Relacion Deposito con Cuenta
Cuenta.hasOne(Depositos, { foreignKey: 'numero_de_cuenta' });
Depositos.hasOne(Cuenta, { foreignKey: 'numero_de_cuenta' });
//Relacion Extracciones con Cuenta
Cuenta.hasOne(Extracciones, { foreignKey: 'numero_de_cuenta' });
Extracciones.hasOne(Cuenta, { foreignKey: 'numero_de_cuenta' });
//Relacion Prestamo con Sucursal
Prestamo.hasOne(Sucursal, { foreignKey: 'id_sucursal' });
Sucursal.hasOne(Prestamo, { foreignKey: 'id_sucursal_emisora' });

export { Cliente, Cuenta, Depositos, Extracciones, Prestamo, Sucursal };
