const User = require("../../models/User");

const createUser = async (req, res) => {
  try {
    const { name, email, username, avatar } = req.body;
    console.log("Received user data:", req.body);
    console.log("Received files:", req.files);

    //Validate required fields
    if (!name || !email || !username) {
      return res
        .status(400)
        .json({ message: "Name, email, and username are required." });
    }
    //Save the user to the database
    const newUser = new User({
      name,
      email,
      username,
      avatar:
        avatar || "https://www.svgrepo.com/show/452030/avatar-default.svg", // Default avatar if not provided
    });

    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Could not create user", error: error.message });
  }
};

module.exports = createUser;
