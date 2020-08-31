const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/keys");

// Models
const { User, Profile } = require("../db/models");

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);

    const payload = {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      username: newUser.username,

      exp: Date.now() + JWT_EXPIRATION_MS,
    };

    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);

    req.body.userId = newUser.id;

    // move this line to right after creating a User object
    // you won't need to use req.body, just pass newUser.id
    // also, since you're not using the profile object, no
    // need to store it in a const.
    const userProfile = await Profile.create({ userId: req.body.userId });

    res.status(201).json({ token });
  } catch (error) {
    // delete this line if you're not using it
    // res.status(401).json({ message: error.errors[0].message });
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { user } = req;
  // delete this line
  //const shop = await Shop.findOne({ where: { userId: user.id } });
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    // pass the profile here.
    role: user.role, // there are no roles in this project
    //shopSlug: shop ? shop.slug : null, // also no slugs
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};
