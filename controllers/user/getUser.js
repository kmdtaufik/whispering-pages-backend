const user = require("../../models/User");

const getUser = async (req, res) => {
  if (req.params.userId) {
    try {
      const { userId } = req.params;

      // Validate userId
      if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
      }

      // Search for the user by ID
      const foundUser = await user.findById(userId);

      if (!foundUser) {
        return res.status(404).json({ message: "User not found." });
      }

      res.status(200).json({ user: foundUser });
    } catch (error) {
      console.error("Error retrieving user:", error);
      res
        .status(500)
        .json({ message: "Could not retrieve user", error: error.message });
    }
  }

  if (req.query.email) {
    try {
      const { email } = req.query;

      // Validate email
      if (!email) {
        return res.status(400).json({ message: "Email is required." });
      }

      // Search for the user by email
      const foundUser = await user.findOne({ email });

      if (!foundUser) {
        return res.status(404).json({ message: "User not found." });
      }

      res.status(200).json({ user: foundUser });
    } catch (error) {
      console.error("Error retrieving user:", error);
      res
        .status(500)
        .json({ message: "Could not retrieve user", error: error.message });
    }
  }
};

module.exports = getUser;
