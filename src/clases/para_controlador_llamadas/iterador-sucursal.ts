import sequelize from '../../datebase';
import { Cliente, Prestamo, Cuenta } from '../../model/relaciones';

export default class IteradorDeSucursales {
  //Suma los clientes por cada sucursal y devuelve una promesa con la respuesta.
  static async clientesSucursal(
    sucursal: string,
    nombreColumnaRespuesta: string
  ): Promise<object> {
    const respuesta = await Cliente.findAll({
      attributes: [
        [
          sequelize.fn('Count', sequelize.col('id_sucursal')),
          nombreColumnaRespuesta,
        ],
      ],
      where: {
        id_sucursal: sucursal,
      },
    });
    return respuesta;
  }
  //Suma todos los saldos de cada cliente por cada sucursal y devuelve una promesa con la respuesta.
  static async saldoTotalSucursal(
    sucursal: string,
    nombreColumnaRespuesta: string
  ): Promise<object> {
    const respuesta = await Cliente.findAll({
      include: [
        {
          model: Cuenta,
          attributes: {
            exclude: [
              'numero_de_cuenta',
              'saldo',
              'id_prestamo',
              'prestamos_pendientes',
            ],
          },
        },
      ],
      attributes: [
        [sequelize.fn('SUM', sequelize.col('saldo')), nombreColumnaRespuesta],
      ],
      group: [sequelize.col('id_sucursal')],//borrar
      where: {
        id_sucursal: sucursal,
      },
    });
    return respuesta;
  }
  //Suma la deuda total de los clientes por cada sucursal y devuelve una promesa con la respuesta.
  static async deudaTotalPorSucursal(
    sucursal: string,
    nombreColumnaRespuesta: string
  ): Promise<object> {
    const respuesta = await Prestamo.findAll({
      attributes: [
        [
          sequelize.fn('SUM', sequelize.col('cantidad_adeudada')),
          nombreColumnaRespuesta,
        ],
      ],
      where: {
        id_sucursal_emisora: sucursal,
      },
  
      
    }
  
    );
    return respuesta;
  }
}
