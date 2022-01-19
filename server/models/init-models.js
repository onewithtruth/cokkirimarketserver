var DataTypes = require("sequelize").DataTypes;
var _categories = require("./categories");
var _chat = require("./chat");
var _hashtags = require("./hashtags");
var _post = require("./post");
var _post_has_categories = require("./post_has_categories");
var _post_has_chat = require("./post_has_chat");
var _post_has_hashtags = require("./post_has_hashtags");
var _refreshtoken = require("./refreshtoken");
var _user = require("./user");

function initModels(sequelize) {
  var categories = _categories(sequelize, DataTypes);
  var chat = _chat(sequelize, DataTypes);
  var hashtags = _hashtags(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var post_has_categories = _post_has_categories(sequelize, DataTypes);
  var post_has_chat = _post_has_chat(sequelize, DataTypes);
  var post_has_hashtags = _post_has_hashtags(sequelize, DataTypes);
  var refreshtoken = _refreshtoken(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  categories.belongsToMany(post, { as: 'post_id_posts', through: post_has_categories, foreignKey: "categories_id", otherKey: "post_id" });
  chat.belongsToMany(post, { as: 'post_id_post_post_has_chats', through: post_has_chat, foreignKey: "chat_id", otherKey: "post_id" });
  hashtags.belongsToMany(post, { as: 'post_id_post_post_has_hashtags', through: post_has_hashtags, foreignKey: "hashtags_id", otherKey: "post_id" });
  post.belongsToMany(categories, { as: 'categories_id_categories', through: post_has_categories, foreignKey: "post_id", otherKey: "categories_id" });
  post.belongsToMany(chat, { as: 'chat_id_chats', through: post_has_chat, foreignKey: "post_id", otherKey: "chat_id" });
  post.belongsToMany(hashtags, { as: 'hashtags_id_hashtags', through: post_has_hashtags, foreignKey: "post_id", otherKey: "hashtags_id" });
  post_has_categories.belongsTo(categories, { as: "category", foreignKey: "categories_id"});
  categories.hasMany(post_has_categories, { as: "post_has_categories", foreignKey: "categories_id"});
  post_has_chat.belongsTo(chat, { as: "chat", foreignKey: "chat_id"});
  chat.hasMany(post_has_chat, { as: "post_has_chats", foreignKey: "chat_id"});
  post_has_hashtags.belongsTo(hashtags, { as: "hashtag", foreignKey: "hashtags_id"});
  hashtags.hasMany(post_has_hashtags, { as: "post_has_hashtags", foreignKey: "hashtags_id"});
  post_has_categories.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(post_has_categories, { as: "post_has_categories", foreignKey: "post_id"});
  post_has_chat.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(post_has_chat, { as: "post_has_chats", foreignKey: "post_id"});
  post_has_hashtags.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(post_has_hashtags, { as: "post_has_hashtags", foreignKey: "post_id"});
  chat.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(chat, { as: "chats", foreignKey: "user_id"});
  post.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(post, { as: "posts", foreignKey: "user_id"});
  refreshtoken.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(refreshtoken, { as: "refreshtokens", foreignKey: "user_id"});

  return {
    categories,
    chat,
    hashtags,
    post,
    post_has_categories,
    post_has_chat,
    post_has_hashtags,
    refreshtoken,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
