module.exports = app => {
    const { STRING, INTEGER, BOOLEAN, DATE } = app.Sequelize;
    const CourseCategory = app.model.define('courseCategory', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING(20),
        isFront: BOOLEAN,
        coverId: INTEGER,
        frontOrder: INTEGER,
        mainOrder: INTEGER,
        createdAt: {
            type: DATE,
            get() {
                return Date.parse(this.getDataValue('createdAt'))
            }
        },
        updatedAt: {
            type: DATE,
            get() {
                return Date.parse(this.getDataValue('createdAt'))
            }
        },
    });
    CourseCategory.associate = () => {
        app.model.CourseCategory.hasMany(app.model.Course, { foreignKey: 'categoryId' });
        app.model.CourseCategory.belongsTo(app.model.Imgs, {
            foreignKey: {
                name: 'coverId',
                defaultValue: 15
            }
        });
    }

    return CourseCategory;
}