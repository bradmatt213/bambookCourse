module.exports = (app) => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const User = app.model.define("users", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(20),
    pwd: STRING(64),
    avatar: TEXT("long"),
    phone: STRING(20),
    sign: STRING(300),
    createdAt: {
      type: DATE,
      get() {
        return Date.parse(this.getDataValue("createdAt"));
      },
    },
    updatedAt: {
      type: DATE,
      get() {
        return Date.parse(this.getDataValue("createdAt"));
      },
    },
    email: STRING(255),
  });
  User.associate = () => {
    app.model.User.hasMany(app.model.Comment, { foreignKey: "userId" });
    app.model.User.belongsToMany(app.model.Course, {
      through: "courseUserSave",
    });
  };

  return User;
};
