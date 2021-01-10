const sequelize = require("../../datebase");
const { statusCodes, mailSender } = require("../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  //MM-18
  invite: async (user, body) => {
    const restaurant = await db.Restaurant.findOne({ attributes: ["id", "name"], where: { id: user.restaurantId } });
    let { role, to, subject, text, html } = body;
    await sequelize.transaction(async (trx) => {
      const invite = await db.Invite.create({ to, role, restaurantId: restaurant.id });
      html = `You have been invited to join "${restaurant.name}" team as "${role}".<br /><a href="https://www.mymenu.com/invite?${invite.token}">Click here to accepte.</a>`;
      await mailSender(to, subject, text, html);
    });
  },
};
