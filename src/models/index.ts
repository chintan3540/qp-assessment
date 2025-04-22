import { defineUserModel } from './user.model';
import { defineGroceryItemModel } from './groceryItem.model';
import { defineOrderModel } from './order.model';
import { defineOrderItemModel } from './orderItem.model';
import { sequelize } from '../config/database';

export const User = defineUserModel(sequelize);
export const GroceryItem = defineGroceryItemModel(sequelize);
export const Order = defineOrderModel(sequelize);
export const OrderItem = defineOrderItemModel(sequelize);

// Associations
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

GroceryItem.hasMany(OrderItem, { foreignKey: 'groceryItemId' });
OrderItem.belongsTo(GroceryItem, { foreignKey: 'groceryItemId' });

export const db = {
  sequelize,
  User,
  GroceryItem,
  Order,
  OrderItem,
};
