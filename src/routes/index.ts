import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import * as adminController from '../controllers/admin.controller';
import * as userController from '../controllers/user.controller';
import * as authController from '../controllers/auth.controller';

const router = Router();

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Admin routes
router.post('/admin/grocery', authenticate, authorize('admin'), adminController.addGrocery);
router.get('/admin/grocery', authenticate, authorize('admin'), adminController.getAll);
router.get('/admin/grocery/:id', authenticate, authorize('admin'), adminController.getOne);
router.put('/admin/grocery/:id', authenticate, authorize('admin'), adminController.updateGrocery);
router.delete('/admin/grocery/:id', authenticate, authorize('admin'), adminController.deleteGrocery);

// User routes
router.get('/groceries', authenticate, authorize('user', 'admin'), userController.viewGroceries);
router.post('/order', authenticate, authorize('user', 'admin'), userController.bookOrder);

export default router;
