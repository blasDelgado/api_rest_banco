import Sucursal, { ISucursal } from '../../model/sucursal';

export default class AgregarSucursal {
  static async crearSucursal(sucursal: ISucursal) {
    try {
      await Sucursal.create(sucursal);
      console.log('Sucursal agregada correctamente');
    } catch (e) {
      console.error(e);
    }
  }
}
