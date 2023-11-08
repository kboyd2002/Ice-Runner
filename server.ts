import express,{ Request, Response, NextFunction } from "express";
import { engine } from "express-handlebars";
import path from "path";
import apiRoutes from './controllers/api/';
import sequelize from "./config/connection.ts";
import { loginFormHandler, signupFormHandler } from './ts/login.ts';
import { logoutFormHandler } from "./ts/logout.ts";

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

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});
