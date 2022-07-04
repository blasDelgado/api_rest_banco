import Cliente from '../../model/cliente';
import Depositos, { IDepositos } from '../../model/depositos';
import Extracciones, { IExtracciones } from '../../model/extracciones';
import Verificador from './verificador';

export default class AgregarOperacion {
  private static async crearDeposito(deposito: IDepositos) {
    try {
      const cuentaV = await Verificador.verificaSiExiste(
        Cliente,
        'numero_de_cuenta',
        deposito.numero_de_cuenta
      );
      if (cuentaV == true) {
        await Depositos.create(deposito);
      } else {
        console.error('El numero de cuenta ingresado no existe');
      }
    } catch (e) {
      console.error(e);
    }
  }
  private static async crearExtraccion(extraccion: IExtracciones) {
    try {
      const cuentaV = await Verificador.verificaSiExiste(
        Cliente,
        'numero_de_cuenta',
        extraccion.numero_de_cuenta
      );
      if (cuentaV == true) {
        await Extracciones.create(extraccion);
      } else {
        console.error('El numero de cuenta ingresado no existe');
      }
    } catch (e) {
      console.error(e);
    }
  }
  static crearOperacion(operacion: IExtracciones | IDepositos) {
    if ('id_extraccion' in operacion) {
      this.crearExtraccion(operacion);
    } else {
      this.crearDeposito(operacion);
    }
  }
}
