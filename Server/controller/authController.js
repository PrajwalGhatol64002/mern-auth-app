import UserAuthInfo from "../models/UserAuthInfo.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await UserAuthInfo.findOne({ email });
    if (existingUser)
      return res
        .status(409)
        .json({ success: false, message: "UserAuthInfo already exists" });

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new UserAuthInfo({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "User Added Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserAuthInfo.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 2); // Add 2 days to the current date

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // Create a new object without the password field
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        expires: expiryDate,
      })
      .status(200)
      .json({
        success: true,
        message: "Login Successful",
        user: userWithoutPassword,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// OAuth code
export const google = async (req, res) => {
  try {
    const user = await UserAuthInfo.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 2); // Add 2 days to the current date

      // Create a new object without the password field
      const userWithoutPassword = { ...user._doc };
      delete userWithoutPassword.password;

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: false,
          expires: expiryDate,
        })
        .status(200)
        .json({
          success: true,
          message: "Successful",
          user: userWithoutPassword,
        });
    } else {
      const generatedPassword = `AJ@${Math.random().toString(36).slice(-8)}`;
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new UserAuthInfo({
        email: req.body.email,
        password: hashedPassword,
        fullName: req.body.fullName,
        profilePic: req.body.profilePic,
        isEmailVerified: req.body.isEmailVerified,
      });
      await newUser.save();

      // Create a new object without the password field
      const userWithoutPassword = { ...newUser };
      delete userWithoutPassword.password;

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 2); // Add 2 days to the current date

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: false,
          expires: expiryDate,
        })
        .status(200)
        .json({
          success: true,
          message: "Successful",
          user: userWithoutPassword,
        });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
