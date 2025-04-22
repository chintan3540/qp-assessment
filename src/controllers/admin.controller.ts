import { Request, Response } from 'express';
import { GroceryItem } from '../models';

export async function addGrocery(req: Request, res: Response) {
  try {
    const { name, price, stock } = req.body;
    const grocery = await GroceryItem.create({ name, price, stock });
    res.status(201).json(grocery);
  } catch (error) {
    console.error("Error in addGrocery:", error);
    res.status(500).json({ message: 'Failed to add grocery item', error });
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const groceries = await GroceryItem.findAll();
    res.status(200).json(groceries);
  } catch (error) {
    console.error("Error in getAll:", error);
    res.status(500).json({ message: 'Failed to fetch grocery items', error });
  }
}

export async function getOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const grocery = await GroceryItem.findByPk(id);

    if (!grocery) {
      return res.status(404).json({ message: 'Grocery item not found' });
    }

    res.status(200).json(grocery);
  } catch (error) {
    console.error("Error in getOne:", error);
    res.status(500).json({ message: 'Failed to fetch grocery item', error });
  }
}

export async function updateGrocery(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const grocery = await GroceryItem.findByPk(id);

    if (!grocery) {
      return res.status(404).json({ message: 'Grocery item not found' });
    }

    await grocery.update(req.body);
    res.status(200).json(grocery);
  } catch (error) {
    console.error("Error in updateGrocery:", error);
    res.status(500).json({ message: 'Failed to update grocery item', error });
  }
}

export async function deleteGrocery(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const deleted = await GroceryItem.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Grocery item not found' });
    }

    res.status(200).json({ message: 'Grocery item deleted successfully' });
  } catch (error) {
    console.error("Error in deleteGrocery:", error);
    res.status(500).json({ message: 'Failed to delete grocery item', error });
  }
}
