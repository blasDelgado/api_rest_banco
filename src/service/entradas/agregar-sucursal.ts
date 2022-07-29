import Sucursal, { ISucursal } from '../../model/sucursal';

export default class AgregarSucursal {
  static async crearSucursal(sucursal: ISucursal): Promise<string> {
    let mensaje: string;
    try {
      await Sucursal.create(sucursal);
      mensaje = 'Sucursal agregada correctamente';
      console.log(mensaje);
      return mensaje;
    } catch (e) {
      console.error(e);
      mensaje =
        'Error al intentar crear una nueva sucursal , verifique los datos ingresados';
      return mensaje;
    }
  }
}
