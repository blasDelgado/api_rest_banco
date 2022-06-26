import Cliente, { ICliente } from '../../model/cliente';
import Cuenta, { ICuenta } from '../../model/cuenta';
import Sucursal from '../../model/sucursal';
import { ModelStatic, Model } from 'sequelize/types';
import Depositos, { IDepositos } from '../../model/depositos';
import Extracciones, { IExtracciones } from '../../model/extracciones';

export class AgregarCliente {
  public static async crearCliente(cuenta: ICuenta, cliente: ICliente) {
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
      } else {
        console.error('La sucursal ingresada no existe');
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export class AgregarOperacion {
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

export class Verificador {
  static async verificaSiExiste(
    modelo: ModelStatic<Model>,
    enQueColumna: string,
    queAtributo: string | number
  ): Promise<boolean> {
    try {
      let consulta: {} = {};
      //@ts-ignore
      consulta[enQueColumna] = queAtributo;

      const siExiste = await modelo.findOne({
        where: consulta,
      });
      let verificado: boolean;
      if (siExiste) {
        verificado = true;
      } else {
        verificado = false;
      }
      return verificado;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
