module.exports = (app) => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const Course = app.model.define("course", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(20),
    author: {
      type: STRING,
    },
    title: STRING(50),
    subTitle: {
      type: STRING(100),
      comment: "副标题",
    },
    categoryId: INTEGER,
    createdAt: {
      type: DATE,
      get() {
        return Date.parse(this.getDataValue("createdAt"));
      },
    },
    content: STRING,
    updatedAt: {
      type: DATE,
      get() {
        return Date.parse(this.getDataValue("createdAt"));
      },
    },
  });
  Course.associate = () => {
    app.model.Course.hasMany(app.model.Imgs, { foreignKey: "courseId" });
    app.model.Course.hasMany(app.model.Comment, { foreignKey: "courseId" });
    app.model.Course.belongsTo(app.model.CourseCategory, {
      foreignKey: "categoryId",
    });
    app.model.Course.belongsToMany(app.model.User, {
      through: "courseUserSave",
    });
  };

  return Course;
};
