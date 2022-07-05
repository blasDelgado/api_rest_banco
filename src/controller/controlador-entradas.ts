import { Request, Response } from 'express';
import AgregarCliente from '../clases/para_controlador_entradas/agregar-cliente';
import AgregarOperacion from '../clases/para_controlador_entradas/agregar-operacion';
import AgregarPrestamo from '../clases/para_controlador_entradas/agregar-prestamo';
import AgregarSucursal from '../clases/para_controlador_entradas/agregar-sucursal';

class ControladorEntradas {
  async nuevoCliente(req: Request, res: Response) {
    const cliente = req.body.cliente;
    const cuenta = req.body.cuenta;

    try {
      let mensaje = await AgregarCliente.crearCliente(cuenta, cliente);
      res.status(200).json({ mensaje: mensaje });
    } catch (e) {
      res.status(500).json({ mensaje: 'ocurrió un error en el servidor' });
      console.error(e);
    }
  }
  async nuevaSucursal(req: Request, res: Response) {
    const sucursal = req.body.sucursal;

    try {
      let mensaje = await AgregarSucursal.crearSucursal(sucursal);
      res.status(200).json({ mensaje: mensaje });
    } catch (e) {
      res.status(500).json({ mensaje: 'ocurrió un error en el servidor' });
      console.error(e);
    }
  }
  async nuevaOperacion(req: Request, res: Response) {
    const operacion = req.body.operacion;

    try {
      let mensaje = await AgregarOperacion.crearOperacion(operacion);
      res.status(200).json({ mensaje: mensaje });
    } catch (e) {
      res.status(500).json({ mensaje: 'ocurrió un error en el servidor' });
      console.error(e);
    }
  }
  async nuevoPrestamo(req: Request, res: Response) {
    const prestamo = req.body.prestamo;

    try {
      let mensaje = await AgregarPrestamo.crearPrestamo(prestamo);
      res.status(200).json({ mensaje: mensaje });
    } catch (e) {
      res.status(500).json({ mensaje: 'ocurrió un error en el servidor' });
      console.error(e);
    }
  }
}

export default new ControladorEntradas();
