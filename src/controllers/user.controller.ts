import { Request, Response } from 'express';
import { GroceryItem, Order, OrderItem } from '../models';
import { Op } from 'sequelize';
import { JwtPayload } from 'jsonwebtoken';

export async function viewGroceries(req: Request, res: Response) {
  try {
    const items = await GroceryItem.findAll({
      where: { stock: { [Op.gt]: 0 } }
    });
    res.status(200).json(items);
  } catch (error) {
    console.error("Error in viewGroceries:", error);
    res.status(500).json({ message: 'Failed to fetch available groceries', error });
  }
}

export async function bookOrder(req: Request, res: Response) {
  try {
    if (!req.user || typeof req.user === 'string' || !(req.user as JwtPayload).id) {
      return res.status(403).json({ message: 'Forbidden: User not authenticated' });
    }

    const userId = (req.user as JwtPayload).id;
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid order: No items provided' });
    }
    
    const order = await Order.create({ userId: userId, status: 'booked' });
    
    for (let item of items) {
      const grocery = await GroceryItem.findByPk(item.groceryId);
      if (!grocery) {
        return res.status(404).json({ message: `Grocery item with ID ${item.groceryId} not found` });
      }

      const currentStock = grocery.getDataValue('stock');
      if (currentStock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for item ID ${item.groceryId}. Available: ${currentStock}, Requested: ${item.quantity}`
        });
      }
      
      await OrderItem.create({
        orderId: order.getDataValue('id'),
        groceryItemId: item.groceryId,
        quantity: item.quantity,
        priceAtOrder: item.priceAtOrder
      });

      await grocery.update({ stock: currentStock - item.quantity });
    }

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order.getDataValue('id')
    });
  } catch (error) {
    console.error("Error in bookOrder:", error);
    res.status(500).json({ message: 'Failed to place order', error });
  }
}
