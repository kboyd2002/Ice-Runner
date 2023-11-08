import express from "express";
import path from "path";
import { Request, Response } from "express";
import apiRoutes from './controllers/api';
import { loginFormHandler, signupFormHandler } from './ts/login';
import { logoutFormHandler } from "./ts/logout";
import { Sequelize } from 'sequelize';

const app = express();

app.get("/", (req: Request, res: Response) => {
    return res.render('home');
});

// Handlebars routes
app.engine('handlebars', require('express-handlebars')());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Link the public folder
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Register API routes
app.use('/api', apiRoutes);

app.use('/seq', Sequelize);

// Login and logout routes
app.use('/login', loginFormHandler);
app.use('/signup', signupFormHandler);
app.use('/logout', logoutFormHandler);

// Listen to server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
