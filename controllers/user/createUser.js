const User = require("../../models/User");

const createUser = async (req, res) => {
  try {
    const { name, email, role, avatar, password } = req.body;
    console.log("Received user data:", req.body);
    const userAvatar = req.files?.avatar?.[0]?.path || null;
    console.log("Received files:", req.files);

    //Validate required fields
    if (!name || !email || !role || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, role, and password are required." });
    }
    //Save the user to the database
    const newUser = new User({
      name,
      email,
      password,
      role: role || "viewer", // Default role if not provided
      avatar:
        userAvatar || "https://www.svgrepo.com/show/452030/avatar-default.svg", // Default avatar if not provided
    });

    const savedUser = await newUser.save();
    res
      .status(201)
      .json({
        success: true,
        message: "User created successfully",
        user: savedUser,
      });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Could not create user",
        error: error.message,
      });
  }
};

module.exports = createUser;
