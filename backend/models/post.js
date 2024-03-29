"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}
  Post.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING(512),
      imageUrl: DataTypes.STRING,
      usersRead: DataTypes.ARRAY(DataTypes.INTEGER),
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
