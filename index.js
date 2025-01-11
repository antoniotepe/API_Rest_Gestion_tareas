const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./src/routes/auth");
const taskRoutes = require("./src/routes/tasks");
const errorHandler = require("./src/middleware/errorHandler");
const PORT = 6500;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(cors());

// rutas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.json({ message: "API is running" });
});

// Middleware de errores
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})