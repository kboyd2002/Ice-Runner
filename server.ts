import express from "express";
import path from "path";
import { Request, Response } from "express";
import apiRoutes from './controllers/api/';
import { engine } from "express-handlebars";
import sequelize from "./config/connection.js";
import { loginFormHandler, signupFormHandler } from './ts/login.js';
import { logoutFormHandler } from "./ts/logout.js";

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
app.use('/api', apiRoutes);

// Connect to Sequelize
app.use('/seq', sequelize)

// Login and logout routes
app.use('/login', loginFormHandler);
app.use('/signup', signupFormHandler);
app.use('/logout', logoutFormHandler);


// Listen to server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
