const user = require("../../models/User");

const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await user.find({});

    // Check if users were found
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    // Return the list of users
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res
      .status(500)
      .json({ message: "Could not retrieve users", error: error.message });
  }
};

module.exports = getAllUsers;
