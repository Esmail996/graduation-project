const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Order extends Model {
    static STATUS = ["pending", "cooking", "ready"];

    static associate(models) {
      this.belongsTo(models.Client, { foreignKey: { name: "clientId", allowNull: false } });
      this.belongsTo(models.Dish, { foreignKey: { name: "dishId", allowNull: false } });
      this.belongsTo(models.User, { foreignKey: { name: "userId" } });
    }
  }

  Order.init(
    {
      amount: { type: DataTypes.INTEGER, defaultValue: 1 },
      note: { type: DataTypes.TEXT },
      status: { type: DataTypes.ENUM(Order.STATUS), defaultValue: "pending" },
      price: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      sequelize,
      underscored: true,
    }
  );

  return Order;
};
