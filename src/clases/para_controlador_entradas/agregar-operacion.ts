import Cliente from "../../model/cliente";
import Depositos, { IDepositos } from "../../model/depositos";
import Extracciones, { IExtracciones } from "../../model/extracciones";
import Verificador from "./verificador";

export default class AgregarOperacion {
  private static async crearDeposito(deposito: IDepositos): Promise<string> {
    let mensaje: string;
    try {
      const cuentaV = await Verificador.verificaSiExiste(
        Cliente,
        "numero_de_cuenta",
        deposito.numero_de_cuenta
      );
      if (cuentaV == true) {
        await Depositos.create(deposito);
        mensaje = "depósito creado con éxito";
        return mensaje;
      } else {
        mensaje = "El número de cuenta ingresado no existe";
        console.error(mensaje);
        return mensaje;
      }
    } catch (e) {
      console.error(e);
      mensaje =
        "ocurrió un error al intentar crear el depósito, verifique los datos ingresados";
      return mensaje;
    }
  }
  private static async crearExtraccion(
    extraccion: IExtracciones
  ): Promise<string> {
    let mensaje: string;
    try {
      const cuentaV = await Verificador.verificaSiExiste(
        Cliente,
        "numero_de_cuenta",
        extraccion.numero_de_cuenta
      );
      if (cuentaV == true) {
        await Extracciones.create(extraccion);
        mensaje = "extraccion creada con éxito";
        return mensaje;
      } else {
        mensaje = "El número de cuenta ingresado no existe";
        console.error(mensaje);
        return mensaje;
      }
    } catch (e) {
      console.error(e);
      mensaje =
        "ocurrió un error al intentar crear la extracción ,verifique los datos ingresados";
      return mensaje;
    }
  }
  static async crearOperacion(
    operacion: IExtracciones | IDepositos
  ): Promise<string> {
    let mensaje: string;

    try {
      if ("id_extraccion" in operacion) {
        mensaje = await this.crearExtraccion(operacion);
        return mensaje;
      } else {
        mensaje = await this.crearDeposito(operacion);
        return mensaje;
      }
    } catch (e) {
      console.error(e);
      mensaje = "ocurrió un error ,verifique los datos ingresados";
      return mensaje;
    }
  }
}
