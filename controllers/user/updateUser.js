const user = require("../../models/User");

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, username, avatar } = req.body;

    // Validate required fields
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Find the user by ID and update
    const updatedUser = await user.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        username,
        avatar:
          avatar || "https://www.svgrepo.com/show/452030/avatar-default.svg", // Default avatar if not provided
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Could not update user", error: error.message });
  }
};
