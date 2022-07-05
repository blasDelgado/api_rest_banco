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
  static async crearPrestamo(prestamo: IPrestamo): Promise<string> {
    let mensaje: string;
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
        await Prestamo.create(prestamo);
        this.cambioDeEstadoDeDeuda(prestamo.id_cliente);
        mensaje = 'Prestamo ingresado correctamente';
        console.log(mensaje);
        return mensaje;
      } else if (sucursalV === true) {
        mensaje = 'Numero de cliente incorrecto';
        console.error(mensaje);
        return mensaje;
      } else if (cuentaV == true) {
        mensaje = 'Numero de sucursal emisora incorrecta';
        console.error(mensaje);
        return mensaje;
      } else {
        mensaje = 'Numero de cliente y sucursal incorrectos';
        console.error(mensaje);
        return mensaje;
      }
    } catch (e) {
      console.error(e);
      mensaje = 'ocurrió un error , verifique los datos ingresado';
      return mensaje;
    }
  }
}
