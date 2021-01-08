const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Client extends Model {}

  Client.init(
    {
      name: { type: DataTypes.STRING(60) },
      phone: { type: DataTypes.STRING(20) },
      order_date: { type: DataTypes.DATE },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  Client.associate = (models) => {
    Client.belongsTo(models.Table, { foreignKey: { name: "tableId", allowNull: false } });
    Client.hasMany(models.Order, { foreignKey: { name: "clientId", allowNull: false } });
    Client.hasOne(models.Bill, { foreignKey: { name: "clientId", allowNull: false } });
  };

  return Client;
};
