import { Router } from "express";
import {SettingsController} from "./controllers/SettingController"
import {UserController} from "./controllers/UserController"
import {MessagesController} from "./controllers/MessagesController"


const routes = Router();

/**
 * Tipos de parametrod
 * Routes Params => Parametros de rotas - http://localhost:3333/settings/1
 * Query Params => Filtros e buscas - http://localhost:3333/settings/1?search=alumacoisa
 * Body Params => {
 * 
 * }
 */

const settingsController = new SettingsController();

const usersController = new UserController();

const messagesController = new MessagesController();

routes.post("/settings", settingsController.create);
routes.get("/settings/:username", settingsController.findByUsername);
routes.put("/settings/:username", settingsController.update);

routes.post("/users", usersController.create)

routes.post("/messages", messagesController.create)
routes.get("/messages/:id", messagesController.showByUser)

export {routes};