const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Profile extends Model {}

Profile.init(
  {
    image: {
      type: DataTypes.STRING,
      // TODO:
      // I recommend a default image value
      // Ideally, in the distant future, in a place far far away,
      //  you'd have manually uploaded an image file to your file server
      //  you'd use the URL of that image as the default profile image
      //  just leaving this here for your info, but don't bother
      //  implementing anything like it
    },
    bio: {
      // TODO
      // no default value, allow null instead
      type: DataTypes.STRING,
      defaultValue: "Tap Here to Add Your Bio!",
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Profile;
