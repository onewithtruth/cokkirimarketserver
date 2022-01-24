const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post_has_hashtags', {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    hashtags_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'post_has_hashtags',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_id" },
          { name: "hashtags_id" },
        ]
      },
      {
        name: "fk_post_has_hashtags_hashtags1_idx",
        using: "BTREE",
        fields: [
          { name: "hashtags_id" },
        ]
      },
      {
        name: "fk_post_has_hashtags_post1_idx",
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
    ]
  });
};
