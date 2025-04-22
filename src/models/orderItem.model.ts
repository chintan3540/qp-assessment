import { DataTypes, Sequelize } from 'sequelize';

export const defineOrderItemModel = (sequelize: Sequelize) => {
  return sequelize.define('OrderItem', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    groceryItemId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceAtOrder: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'OrderItems',
    timestamps: false,
  });
};
