import Cuenta from '../../model/cuenta';
import Prestamo, { IPrestamo } from '../../model/prestamo';
import Cliente from '../../model/cliente';
import Sucursal from '../../model/sucursal';
import Verificador from './verificador';

export default class AgregarPrestamo {
  private static async cambioDeEstadoDeDeuda(cuenta: number) {
    try {
      const cliente = await Cuenta.update(
        {
          prestamos_pendientes: 1,
        },
        {
          where: {
            numero_de_cuenta: cuenta,
          },
        }
      );
      console.log('Cambio el estado de deuda del cliente');
    } catch (e) {
      console.error(e);
    }
  }
  static async crearPrestamo(prestamo: IPrestamo) {
    try {
      const cuentaV = await Verificador.verificaSiExiste(
        Cliente,
        'id_cliente',
        prestamo.id_cliente
      );
      const sucursalV = await Verificador.verificaSiExiste(
        Sucursal,
        'id_sucursal',
        prestamo.id_sucursal_emisora
      );

      if (cuentaV == true && sucursalV == true) {
        Prestamo.create(prestamo);
        this.cambioDeEstadoDeDeuda(prestamo.id_cliente);
        console.log('Prestamo ingresado correctamente');
      } else if (sucursalV == true) {
        console.error('Numero de cliente incorrecto');
      } else if (cuentaV == true) {
        console.error('Numero de sucursal emisora incorrecta');
      } else {
        console.log('Numero de cliente y sucursal incorrectos');
      }
    } catch (e) {
      console.error(e);
    }
  }
}
