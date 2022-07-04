import { Request, Response } from 'express';
import AgregarCliente from '../clases/para_controlador_entradas/agregar-cliente';

class ControladorEntradas {
  async nuevoCliente(req: Request, res: Response) {
    const cliente = req.body.cliente;
    const cuenta = req.body.cuenta;
    let mensaje;
    try {
      mensaje = await AgregarCliente.crearCliente(cuenta, cliente);
      res.status(200).json({ mensaje: mensaje });
    } catch (e) {
      res.status(500).json({ mensaje: 'error en el servidor' });
      console.error(e);
    }
  }
  nuevaSucursal() {}
  nuevaOperacion() {}
  nuevoPrestamo() {}
}

export default new ControladorEntradas();
