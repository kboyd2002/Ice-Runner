import express from "express";
import path from "path";
import { Request, Response } from "express";
import apiRoutes from './controllers/api/';
import session from "express-session";
import { engine } from "express-handlebars";
import dotenv from "dotenv";
import { Model, InferAttributes , InferCreationAttributes, CreationOptional } from 'sequelize';
import loginRouter from "./ts/login";
import logoutRouter from "./ts/logout"

const app = express();

app.get("/", (req: Request, res: Response) => {
    return res.render('home');
});

// Handlebars routes
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Link the public folder
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Register API routes
api.use('/api', apiRoutes);

// Login and logout routes
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);


// Listen to server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
