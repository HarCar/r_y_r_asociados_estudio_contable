const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');

//Coneccion a base de datos
mongoose.connect('mongodb+srv://admin:123@cluster0.aqptsul.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Crear app
const app = express();

//Configurar
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Crear model de Usuario
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

//Endpoint para crear un usuario
app.post('/registro', async (req, res) => {
  const { username, password } = req.body;

  try {
     // Encriptar la contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(password, 10); // 10 es el costo del hash

    const newUser = new User({ 
      username, 
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

//Endpoint para autenticar
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    if (user) {
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

//Definir la carpeta publica
app.use(express.static('public'));

// Ruta para la página de registro
app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});

// Ruta para la página de bienvenida
app.get('/bienvenida', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bienvenida.html'));
});

// Ruta para la página de documentación
app.get('/documentacion', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'documentacion.html'));
});

//Iniciar app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});