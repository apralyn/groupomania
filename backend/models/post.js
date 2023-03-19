"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}
  Post.init(
    {
      title: {type: DataTypes.STRING, allowNull:false},
      description: {type: DataTypes.STRING, allowNull:false},
      imageUrl: {type: DataTypes.STRING, allowNull:false},
      likes: {type: DataTypes.INTEGER, allowNull:false},
      usersLiked: {type: [DataTypes.STRING],allowNull:false },
      userId: {type: DataTypes.STRING, allowNull:false}
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};