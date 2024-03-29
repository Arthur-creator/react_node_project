// Create User model using sequelize with email, password, firstname and isAdmin
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const bcryptjs = require("bcryptjs");

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    confirmationCode: {
      type: DataTypes.STRING,
      unique: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
      isReported: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
      nombreReported: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      technos: {
        type: DataTypes.STRING,
          allowNull:true
      }
    // raisonReport: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    //     allowNull: true
    // }
  },
  {
    sequelize: connection,
    modelName: "users",
    paranoid: true,
  }
);

User.addHook("beforeCreate", async (user) => {
  user.password = await bcryptjs.hash(user.password, await bcryptjs.genSalt());
});

User.addHook("beforeUpdate", async (user, { fields }) => {
  if (fields.includes("password")) {
    user.password = await bcryptjs.hash(
      user.password,
      await bcryptjs.genSalt()
    );
  }
});

module.exports = User;