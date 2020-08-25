exports.signup = async (req, res, next) => {
  try {
    console.log("Hi");
    // const newUser = await User.create(req.body);
    //res.json(newUser);
  } catch (error) {
    next(error);
  }
};
