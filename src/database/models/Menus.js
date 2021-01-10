const { Model, DataTypes } = require("sequelize");
const { statusCodes } = require("../../helpers");

module.exports = (sequelize) => {
  class Menu extends Model {
    static async checkPermission(user, id) {
      const Menu = await this.findOne({
        attributes: ["id"],
        where: { id, restaurantId: user.restaurantId },
      });
      if (!Menu) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Not Found");
    }
  }

  Menu.init(
    {
      name: { type: DataTypes.STRING(100) },
      description: { type: DataTypes.TEXT },
      thumpnail: { type: DataTypes.TEXT, nullable: true },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  Menu.associate = (models) => {
    Menu.belongsTo(models.Restaurant, { foreignKey: { name: "restaurantId", allowNull: false } });
    Menu.hasMany(models.Category, { foreignKey: { name: "menuId", allowNull: false } });
  };

  return Menu;
};