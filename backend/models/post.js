"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}
  Post.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      read: DataTypes.INTEGER,
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
