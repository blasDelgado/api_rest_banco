import { Request, Response } from 'express';
import { Model, Op } from 'sequelize';
import sequelize from '../datebase';
import {
  Cliente,
  Depositos,
  Extracciones,
  Prestamo,
  Sucursal,
} from '../model/relaciones';
import { Cuenta } from '../model/relaciones';

class ControladorAdmin {
  api(req: Request, res: Response) {
    res.json({
      'Todos los Clientes': 'http://localhost:3000/banco/todos-los-clientes',
      'Busca el cliente con el nombre dado':
        'http://localhost:3000/banco/cliente-por-nombre',
      'Busca el cliente con el numero de cuenta dado':
        'http://localhost:3000/banco/cliente-por-cuenta',
      'Busca el cliente con el saldo mayor que el dado':
        'http://localhost:3000/banco/cliente-con-saldo-mayor-que',
      'Busca el cliente con el saldo menor que el dado':
        'http://localhost:3000/banco/cliente-con-saldo-menor-que',
      'Busca los clientes que tienen un prestamo':
        'http://localhost:3000/banco/cliente-con-prestamo',
      'Todas las extracciones del cliente dado':
        'http://localhost:3000/banco/todas-las-extracciones',
      'Todas las extracciones con el monto dado':
        'http://localhost:3000/banco/todas-las-extracciones-monto-dado',
      'Todas las extracciones de la fecha dada':
        'http://localhost:3000/banco/todas-las-extracciones-fechas-dadas',
      'Todos los depósitos del cliente dado':
        'http://localhost:3000/banco/todos-los-depositos',
      'Todos los depósitos con el monto dado':
        'http://localhost:3000/banco/todos-los-depositos-monto-dado',
      'Todos los depósitos de la fecha dada':
        'http://localhost:3000/banco/todos-los-depositos-fechas-dadas',
      'Monto total ,que actualmente ,le deben al banco':
        'http://localhost:3000/banco/monto-total-de-deuda-emitida',
      'Cantidad de clientes por cada sucursal':
        'http://localhost:3000/banco/total-de-clientes-por-sucursal',
      'Cantidad de plata depositada por cada sucursal':
        'http://localhost:3000/banco/total-de-depositos-por-sucursal',
      'Cantidad de deuda ,de los clientes, por cada sucursal':
        'http://localhost:3000/banco/total-de-deuda-por-sucursal',
    });
  }
  async todosLosClientes(req: Request, res: Response) {
    try {
      const respuesta = await Cliente.findAll();

      res.status(200).json(respuesta);
    } catch (e) {
      res.status(500).json({ Mensaje: 'ocurrió un error' });

      console.error(e);
    }
  }
  async clientePorNombre(req: Request, res: Response) {
    const nombre: String = req.body.nombre;

    try {
      const respuesta = await Cliente.findAll({
        where: { nombre_cliente: nombre },
      });
      if (!respuesta[0]) {
        res
          .status(200)
          .json({ mensaje: 'No existe el cliente con el nombre dado' });
      } else {
        res.status(200).json(respuesta);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ Mensaje: 'ocurrió un error' });
    }
  }
  async clientePorCuenta(req: Request, res: Response) {
    const cuenta: Number = req.body.cuenta;
    try {
      const respuesta = await Cliente.findAll({
        where: { numero_de_cuenta: cuenta },
      });
      if (!respuesta[0]) {
        res.status(200).json({
          mensaje: 'No existe el cliente con el numero de cuenta dada',
        });
      } else {
        res.status(200).json(respuesta);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ Mensaje: 'ocurrió un error' });
    }
  }
  async clienteConMasSaldoQueElDado(req: Request, res: Response) {
    const saldo: Number = req.body.saldo;
    try {
      const respuesta = await Cuenta.findAll({
        include: {
          model: Cliente,
          attributes: ['nombre_cliente'],
        },
        attributes: ['saldo', 'numero_de_cuenta'],

        where: {
          saldo: {
            [Op.gt]: saldo,
          },
        },
      });
      if (!respuesta[0]) {
        res.status(200).json({
          mensaje: 'No existen clientes con saldo mayor que ese',
        });
      } else {
        res.status(200).json(respuesta);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ Mensaje: 'ocurrió un error' });
    }
  }
  async clienteConMenosSaldoQueElDado(req: Request, res: Response) {
    const saldo: Number = req.body.saldo;
    try {
      const respuesta = await Cuenta.findAll({
        include: {
          model: Cliente,
          attributes: ['nombre_cliente'],
        },
        attributes: ['saldo', 'numero_de_cuenta'],

        where: {
          saldo: {
            [Op.lt]: saldo,
          },
        },
      });
      if (!respuesta[0]) {
        res.status(200).json({
          mensaje: 'No existen clientes con menos de ese saldo',
        });
      } else {
        res.status(200).json(respuesta);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ Mensaje: 'ocurrió un error' });
    }
  }
  async clienteConPrestamo(req: Request, res: Response) {
    try {
      const respuesta = await Cuenta.findAll({
        include: [
          {
            model: Prestamo,
            attributes: [
              'cantidad_adeudada',
              'fecha_de_vencimiento',
              'id_sucursal_emisora',
            ],
          },
          {
            model: Cliente,
            attributes: ['nombre_cliente'],
          },
        ],
        attributes: ['numero_de_cuenta', 'saldo'],

        where: {
          prestamos_pendientes: ['1'],
        },
      });
      res.status(200).json(respuesta);
    } catch (e) {
      console.error(e);
      res.status(500).json({ Mensaje: 'ocurrió un error' });
    }
  }
  async todasLasExtracciones(req: Request, res: Response) {
    const cuenta = req.body.cuenta;

    try {
      const respuesta = await Extracciones.findAll({
        where: {
          numero_de_cuenta: [cuenta],
        },
      });
      if (!respuesta[0]) {
        res.status(200).json({
          mensaje: 'El cliente no existe , o no realizó ninguna extraccion',
        });
      } else {
        res.status(200).json(respuesta);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ Mensaje: 'ocurrió un error' });
    }
  }
  async extraccionesPorMonto(req: Request, res: Response) {
    const monto = req.body.monto;
    try {
      const respuesta = await Extracciones.findAll({
        where: {
          monto_extraido: [monto],
        },
      });
      if (!respuesta[0]) {
        res.status(200).json({
          mensaje: 'No existen extracciones con ese monto',
        });
      } else {
        res.status(200).json(respuesta);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ Mensaje: 'ocurrió un error' });
    }
  }
  async extraccionesPorFecha(req: Request, res: Response) {
    const fecha = req.body.fecha;
    const fechaForm = new Date(fecha);
    try {
      const respuesta = await Extracciones.findAll({
        where: {
          fecha_de_extraccion: [fechaForm],
        },
      });
      if (!respuesta[0]) {
        res.status(200).json({
          mensaje: 'No existen extracciones en esa fecha',
        });
      } else {
        res.status(200).json(respuesta);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ Mensaje: 'ocurrió un error' });
    }
  }
  async todosLosDepositos(req: Request, res: Response) {
    const cuenta = req.body.cuenta;

    try {
      const respuesta = await Depositos.findAll({
        where: {
          numero_de_cuenta: [cuenta],
        },
      });
      if (!respuesta[0]) {
        res.status(200).json({
          mensaje: 'El cliente no existe , o no realizó depósitos',
        });
      } else {
        res.status(200).json(respuesta);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ Mensaje: 'ocurrió un error' });
    }
  }
  async depositosPorMonto(req: Request, res: Response) {
    const monto = req.body.monto;
    try {
      const respuesta = await Depositos.findAll({
        where: {
          monto_depositado: [monto],
        },
      });
      if (!respuesta[0]) {
        res.status(200).json({
          mensaje: 'No existen depósitos con ese monto',
        });
      } else {
        res.status(200).json(respuesta);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ Mensaje: 'ocurrió un error' });
    }
  }
  async depositosPorFecha(req: Request, res: Response) {
    const fecha = req.body.fecha;
    const fechaForm = new Date(fecha);
    try {
      const respuesta = await Depositos.findAll({
        where: {
          fecha_de_deposito: [fechaForm],
        },
      });
      if (!respuesta[0]) {
        res.status(200).json({
          mensaje: 'No existen depósitos en esa fecha',
        });
      } else {
        res.status(200).json(respuesta);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ Mensaje: 'ocurrió un error' });
    }
  }
  async totalDePlataPrestada(req: Request, res: Response) {
    try {
      const respuesta = await Prestamo.sum('cantidad_adeudada');
      res.status(200).json({ Monto_total: respuesta });
    } catch (e) {
      console.error(e);
      res.status(500).json({ Mensaje: 'ocurrió un error' });
    }
  }
  async totalDePlataEnElBanco(req: Request, res: Response) {
    try {
      const respuesta = await Cuenta.sum('saldo');
      res.status(200).json({ Monto_total: respuesta });
    } catch (e) {
      console.error(e);
      res.status(500).json({ Mensaje: 'ocurrió un error' });
    }
  }
  async totalDeClientesPorSucursal(req: Request, res: Response) {
    try {
      const respuesta1 = await clientesSucursal(
        '1',
        'total_clientes_sucursal_1'
      );

      const respuesta2 = await clientesSucursal(
        '2',
        'total_clientes_sucursal_2'
      );

      const respuesta3 = await clientesSucursal(
        '3',
        'total_clientes_sucursal_3'
      );

      res.status(200).json([respuesta1, respuesta2, respuesta3]);
    } catch (e) {
      console.error(e);
      res.status(500).json({ Mensaje: 'ocurrió un error' });
    }
  }
  async saldoTotalPorSucursal(req: Request, res: Response) {
    try {
      const respuesta1 = await saldoTotalSucursal(
        '1',
        'saldo_total_sucursal_1'
      );
      const respuesta2 = await saldoTotalSucursal(
        '2',
        'saldo_total_sucursal_2'
      );
      const respuesta3 = await saldoTotalSucursal(
        '3',
        'saldo_total_sucursal_3'
      );
      res.status(200).json({ respuesta1, respuesta2, respuesta3 });
    } catch (e) {
      console.error(e);
      res.status(500).json({ Mensaje: 'ocurrió un error' });
    }
  }
  async deudaTotalPorSucursal(req: Request, res: Response) {
    try {
      const respuesta1 = await deudaTotalPorSucursal(
        '1',
        'deuda_total_sucursal_1'
      );
      const respuesta2 = await deudaTotalPorSucursal(
        '2',
        'deuda_total_sucursal_2'
      );
      const respuesta3 = await deudaTotalPorSucursal(
        '3',
        'deuda_total_sucursal_3'
      );
      res.status(200).json({ respuesta1, respuesta2, respuesta3 });
    } catch (e) {
      console.error(e);
      res.status(500).json({ Mensaje: 'ocurrió un error' });
    }
  }
}

export default new ControladorAdmin();

//Funciones útiles

//Suma los clientes por cada sucursal y devuelve una promesa con la respuesta.
async function clientesSucursal(
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
async function saldoTotalSucursal(
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
    where: {
      id_sucursal: sucursal,
    },
  });
  return respuesta;
}
//Suma la deuda total de los clientes por cada sucursal y devuelve una promesa con la respuesta.
async function deudaTotalPorSucursal(
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
  });
  return respuesta;
}
