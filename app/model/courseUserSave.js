module.exports = (app) => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const CourseUserSave = app.model.define("courseUserSave", {
    saved: BOOLEAN,
  });

  return CourseUserSave;
};
