module.exports = app => {
    const { STRING, INTEGER, DATE, BLOB } = app.Sequelize;

    const Imgs = app.model.define('imgs', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: STRING,
        courseId: INTEGER,
        filename: STRING,
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
    Imgs.associate = () => {

    }

    return Imgs;
}