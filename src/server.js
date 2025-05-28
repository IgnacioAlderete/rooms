require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path')


app.use(express.static(path.join(__dirname, 'src')));

// Resto de tu configuración de rutas y middleware
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html')); // Cambia 'index.html' por tu archivo principal
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});