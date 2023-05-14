'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  like.init({
    movieId: DataTypes.STRING,
    mediaType: DataTypes.STRING,
    username: DataTypes.STRING,
    mediaImg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'like',
  });
  return like;
};