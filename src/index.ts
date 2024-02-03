import express from 'express';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { getUsers, getUserById } from './controllers/UserController';

const app = express();
const PORT = process.env.PORT || 3000;

export const AppDataSource = new DataSource({
  type: "oracle",
  host: "localhost",
  port: 1521,
  username: "hr",
  password: "fit123",
  database: "xe",
  entities: [User],
  synchronize: true,
  logging: false,
})

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
  .then(() => {
    app.use(express.json());

    // Routes
    app.get('/users', getUsers);
    app.get('/users/:id', getUserById);


    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error))
