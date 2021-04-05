module.exports = (app) => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const Comment = app.model.define("comments", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    content: STRING(5000),
    createdAt: {
      type: DATE,
      get() {
        return Date.parse(this.getDataValue("createdAt"));
      },
    },
    score: INTEGER,
    updatedAt: {
      type: DATE,
      get() {
        return Date.parse(this.getDataValue("createdAt"));
      },
    },
  });
  Comment.associate = () => {
    app.model.Comment.belongsTo(app.model.User, { foreignKey: "userId" });
    app.model.Comment.belongsTo(app.model.Course, { foreignKey: "courseId" });
  };

  return Comment;
};
