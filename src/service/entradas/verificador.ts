import { Model, ModelStatic } from 'sequelize/types';

export default class Verificador {
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
