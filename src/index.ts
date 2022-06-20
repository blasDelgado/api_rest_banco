import app from './app';
import bd from './datebase';

bd.authenticate()
  .then(() => console.log('Conexión a base de datos establecida'))
  .catch((e) => console.log(e));

const puerto = process.env.port || 3000;

app.listen(puerto, () =>
  console.log(`Servidor establecido en el puerto: ${puerto}`)
);
