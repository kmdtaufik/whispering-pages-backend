const user = require("../../models/User");

const register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    // Check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "E-mail already exists" });
    }

    // Create a new user
    const newUser = new user({
      name,
      email,
      password,
      role: "user", // Default role
      avatar:
        avatar || "https://www.svgrepo.com/show/452030/avatar-default.svg", // Default avatar if not provided
    });

    await newUser.save();
    res
      .status(201)
      .json({
        success: true,
        message: "User registered successfully",
        user: newUser,
      });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = register;
