import Cuenta, { ICuenta } from '../../model/cuenta';
import Cliente, { ICliente } from '../../model/cliente';
import Sucursal from '../../model/sucursal';
import Verificador from './verificador';

export default class AgregarCliente {
  public static async crearCliente(
    cuenta: ICuenta,
    cliente: ICliente
  ): Promise<string> {
    let mensaje: string;
    try {
      const sucursalV: boolean = await Verificador.verificaSiExiste(
        Sucursal,
        'id_sucursal',
        cliente.id_sucursal
      );
      if (sucursalV == true) {
        const clienteCreado = await Cuenta.create(cuenta);
        const numeroDeCuenta = clienteCreado.toJSON().numero_de_cuenta;
        cliente.numero_de_cuenta = numeroDeCuenta;
        await Cliente.create(cliente);
        mensaje = 'Cliente ingresado correctamente';
        return mensaje;
      } else {
        mensaje = 'La sucursal ingresada no existe';
        console.error(mensaje);
        return mensaje;
      }
    } catch (e) {
      mensaje =
        'Error , verifique los datos ingresados , recuerde ingresar un cliente y una cuenta con todos los campos requeridos';
      console.error(e);
      return mensaje;
    }
  }
}
