import express, {Request, Response } from "express";
import session from "express-session";
import exphbs from "express-handlebars";
import dotenv from "dotenv";
import { Model, InferAttributes , InferCreationAttributes, CreationOptional } from 'sequelize';

const app = express();
const port = 3001;

// Setup Middleware

app.get("/", (req: Request, res: Response) => {
    return res.json();
});

// app.post()

// Listen to server
try {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
} catch (error) {
    console.log(`Error occurred: ${error.message}`)
}
