const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3004;

// Middleware
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Modelo de usuario
const User = mongoose.model('User', new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: String
}), 'users'); // Especifica el nombre de la colección aquí

// Ruta para eliminar usuario por nombre, apellido y email
app.delete('/deleteUser', async (req, res) => {
  const { nombre, apellido, email } = req.body;
  
  try {
    const result = await User.findOneAndDelete({ nombre, apellido, email });
    
    if (result) {
      res.send(`Usuario ${nombre} ${apellido} eliminado exitosamente`);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    res.status(400).send('Error al intentar eliminar el usuario');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Microservicio DeleteUser escuchando en el puerto ${port}`);
});
