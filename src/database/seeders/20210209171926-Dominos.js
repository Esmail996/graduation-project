"use strict";

const { hash } = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const restaurant = [
      {
        id: 1,
        name: "Dominos",
        address: "Hama-AlBaath",
      },
    ];

    // password: domPassword
    const users = [
      {
        first_name: "Admin",
        last_name: "Admin",
        email: "admin@dominos.com",
        password: await hash("domPassword", Number(process.env.BCRYPT_ROUNDS)),
        phone: "+963962213470",
        birthdate: "1997/04/10",
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
        restaurant_id: 1,
      },
      {
        first_name: "chef",
        last_name: "chef",
        email: "chef@dominos.com",
        password: await hash("domPassword", Number(process.env.BCRYPT_ROUNDS)),
        phone: "+963962213470",
        birthdate: "1997/04/10",
        role: "chef",
        created_at: new Date(),
        updated_at: new Date(),
        restaurant_id: 1,
      },
      {
        first_name: "manager",
        last_name: "manager",
        email: "manager@dominos.com",
        password: await hash("domPassword", Number(process.env.BCRYPT_ROUNDS)),
        phone: "+963962213470",
        birthdate: "1997/04/10",
        role: "manager",
        created_at: new Date(),
        updated_at: new Date(),
        restaurant_id: 1,
      },
      {
        first_name: "author",
        last_name: "author",
        email: "author@dominos.com",
        password: await hash("domPassword", Number(process.env.BCRYPT_ROUNDS)),
        phone: "+963962213470",
        birthdate: "1997/04/10",
        role: "author",
        created_at: new Date(),
        updated_at: new Date(),
        restaurant_id: 1,
      },
      {
        first_name: "accountant",
        last_name: "accountant",
        email: "accountant@dominos.com",
        password: await hash("domPassword", Number(process.env.BCRYPT_ROUNDS)),
        phone: "+963962213470",
        birthdate: "1997/04/10",
        role: "accountant",
        created_at: new Date(),
        updated_at: new Date(),
        restaurant_id: 1,
      },
      {
        first_name: "waiter",
        last_name: "waiter",
        email: "waiter@dominos.com",
        password: await hash("domPassword", Number(process.env.BCRYPT_ROUNDS)),
        phone: "+963962213470",
        birthdate: "1997/04/10",
        created_at: new Date(),
        updated_at: new Date(),
        role: "waiter",
        restaurant_id: 1,
      },
    ];

    const menus = [
      {
        id: 1,
        title: "Main menu",
        ar_title: "القائمة الرئيسية",
        currency: "SYR",
        restaurant_id: 1,
      },
    ];

    const tables = [];
    for (let i = 0; i < 10; i++) tables.push({ code: require("uuid").v4(), number: i + 1, restaurant_id: 1, menu_id: 1 });

    const categories = [
      {
        id: 1,
        title: "Sandwiches",
        ar_title: "سادندويتش",
        icon_id: 1,
        menu_id: 1,
      },
      {
        id: 2,
        title: "Meals",
        ar_title: "وجبات",
        icon_id: 1,
        menu_id: 1,
      },
    ];

    const dishes = [
      {
        name: "Santa Fe",
        ar_name: "سانتافيه",
        description: "These Santa Fe Sandwiches are a quick and easy way to make your next lunch hour something special.",
        ar_description: "سريعة التحضير",
        code: "santaFe01",
        price: 3000,
        discount: 0,
        status: "active",
        preparation_time: 15,
        calories: 35,
        restaurant_id: 1,
        category_id: 1,
      },
      {
        name: "Zinger",
        ar_name: "زنجر",
        description:
          "Zinger sandwich has chicken layer ,egg layer and a veggie mayo layer..that makes a wholesome meal for breakfast.",
        ar_description: "طبقة دجاج وطبقة بيض وطبقة مايونيز",
        code: "zinger01",
        price: 3000,
        discount: 0,
        status: "active",
        preparation_time: 15,
        calories: 45,
        restaurant_id: 1,
        category_id: 1,
      },
      {
        name: "Chitza",
        ar_name: "تشيتزا",
        description: "Chicken + Pizza.",
        ar_description: "نص بيتزا ونص جاج",
        code: "chitza01",
        price: 4500,
        discount: 0,
        status: "active",
        preparation_time: 20,
        calories: 100,
        restaurant_id: 1,
        category_id: 2,
      },
      {
        name: "Grand Fajita",
        ar_name: "غراند فاهيتا",
        description: "Grilled meat served as a taco on a flour or corn tortilla.",
        ar_description: "لحم مشوي مثل التاكو",
        code: "fajita01",
        price: 4500,
        discount: 0,
        status: "active",
        preparation_time: 10,
        calories: 100,
        restaurant_id: 1,
        category_id: 2,
      },
    ];

    const subscriptions = [{ status: "active", restaurant_id: 1, subscription_id: 1, payment_method_id: 1 }];

    await queryInterface.bulkInsert("restaurants", restaurant);
    await queryInterface.bulkInsert("users", users);
    await queryInterface.bulkInsert("menus", menus);
    await queryInterface.bulkInsert("tables", tables);
    await queryInterface.bulkInsert("categories", categories);
    await queryInterface.bulkInsert("dishes", dishes);
    await queryInterface.bulkInsert("restaurants_subscriptions", subscriptions);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("restaurants");
    await queryInterface.bulkDelete("users");
    await queryInterface.bulkDelete("menus");
    await queryInterface.bulkDelete("tables");
    await queryInterface.bulkDelete("categories");
    await queryInterface.bulkDelete("dishes");
    await queryInterface.bulkDelete("restaurants_subscriptions");
  },
};
