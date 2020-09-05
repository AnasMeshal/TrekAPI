const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/keys");

// Models
const { User, Profile, List } = require("../db/models");

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const profile = await Profile.create({ userId: newUser.id });
    await List.create({ name: "Want To Go", userId: newUser.id });

    const payload = {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      username: newUser.username,
      // TODO find a way to unwrap object while excluding properties easily (iterate)
      profile: { bio: profile.bio, image: profile.image, id: profile.id },
      wantToGoList: [],
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    // sign up errors testing: res.status(401).json({ message: error.errors[0].message });
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { user } = req;
  const profile = await Profile.findOne({
    where: {
      userId: user.id,
    },
    attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
  });
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profile: profile,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};
