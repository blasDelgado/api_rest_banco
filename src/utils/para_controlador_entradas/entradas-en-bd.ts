import { ModelStatic, Model } from 'sequelize/types';
import Cliente, { ICliente } from '../../model/cliente';
import Cuenta, { ICuenta } from '../../model/cuenta';
import Depositos, { IDepositos } from '../../model/depositos';
import Extracciones, { IExtracciones } from '../../model/extracciones';
import Sucursal, { ISucursal } from '../../model/sucursal';
import Prestamo, { IPrestamo } from '../../model/prestamo';

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

export class AgregarSucursal {
  static async crearSucursal(sucursal: ISucursal) {
    try {
      await Sucursal.create(sucursal);
      console.log('Sucursal agregada correctamente');
    } catch (e) {
      console.error(e);
    }
  }
}

export class AgregarPrestamo {
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

export class Verificador {
  static async verificaSiExiste(
    modelo: ModelStatic<Model>,
    quePropiedad: string,
    queAtributo: string | number
  ): Promise<boolean> {
    try {
      let consulta: {} = {};
      //@ts-ignore
      consulta[quePropiedad] = queAtributo;

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
