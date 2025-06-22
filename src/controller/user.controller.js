const User = require("../models/user.model");
const {
  userSignUpValidationSchema,
  userSignInValidationSchema,
} = require("../utils/validations");
const bcrypt = require("bcrypt");

const handleUserSignUp = async (req, res) => {
  try {
    const validation = userSignUpValidationSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        errors:
          validation.error.flatten().fieldErrors ||
          "all the fields are required!",
      });
    }

    //checking if user with same email exits or not

    const isUserAlreadyExists = await User.findOne({
      email: req.body.email,
    });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        error: "email already in use!",
      });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 8);

    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: hashPassword,
      age: req.body.age,
      email: req.body.email.toLowerCase(),
      skills: req.body.skills,
      gender: req.body.gender,
      photoUrl: req.body.photoUrl,
    });

    return res.status(201).json({
      message: "User created successfully!",
      data: {
        id: user._id,
        firstName: user.firstName,
      },
    });
  } catch (error) {
    console.log("Error while signUp" + error.message);
    res.status(500).json({
      error:
        "Something went wrong while creating your account, please try again later!",
    });
  }
};

const handleUserSignIn = async (req, res) => {
  try {
    const { email, password } = userSignInValidationSchema.parse(req.body);

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password1" });
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid email or password!",
      });
    }

    const token = await user.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    return res.status(200).json({
      message: "User login seccessfully!",
      data: {
        userName: user.userName,
        photoUrl: user.photoUrl,
        firstName: user.firstName,
      },
    });
  } catch (error) {
    console.log("Error while signIn" + error.message);
    // Handling Zod validation errors generically
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    // Handling other errors (e.g., DB issues)
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  handleUserSignUp,
  handleUserSignIn,
};
