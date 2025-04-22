import { DataTypes, Sequelize } from 'sequelize';

export const defineOrderModel = (sequelize: Sequelize) => {
  return sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'Orders',
    timestamps: false,
  });
};
