import { Router } from 'express';
import AuthController from '../controllers/auth-controllers.js';
import UserController from '../controllers/user-controllers.js';
import WorkControllers from '../controllers/work-controllers.js';
import TypeWorkController from '../controllers/type-work-controllers.js';
import { registrationValidator, typeWorkValidator } from '../validator/auth.js';
import authMiddleware from './../middlewares/auth-middleware.js';
const router = new Router()

const authController = new AuthController()
const userController = new UserController()
const workControllers = new WorkControllers()
const typeWorkControllers = new TypeWorkController()

router.post('/registration', 
			registrationValidator, 
			authController.registration)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/refresh', authController.refresh )
router.get('/users', authMiddleware, userController.getAllUsers)
router.get('/user', userController.getOneUser)
router.patch('/user/:id', authMiddleware, userController.updateUser)
router.delete('/user/:id', authMiddleware, userController.deleteUser)
router.post('/work', authMiddleware, workControllers.createWork)
router.get('/works/:id', authMiddleware, workControllers.getWorksByUserId)
router.patch('/work', authMiddleware, workControllers.updateWork)
router.delete('/work/:id', authMiddleware, workControllers.deleteWork)
router.post('/type-work', typeWorkValidator, authMiddleware, typeWorkControllers.createTypeWork)
router.get('/type-work',typeWorkControllers.getAllTypesWorks)
router.get('/search-type-work:typeWork', typeWorkControllers.searchTypeWorks)
router.patch('/type-work/:id', authMiddleware, typeWorkControllers.updateTypeWork)
router.delete('/type-work/:id', authMiddleware, typeWorkControllers.deleteTypeWork)



export default router;