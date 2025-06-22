const User = require("../../models/User");

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, role, password } = req.body;
    const userAvatar = req.files?.avatar?.[0]?.path || null;

    // Validate required fields
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Build update data
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (password) updateData.password = password;
    if (userAvatar) updateData.avatar = userAvatar;

    // Find the user by ID and update
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "User updated successfully",
        user: updatedUser,
      });
  } catch (error) {
    console.error("Error updating user:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already exists",
        error: error.message,
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    res
      .status(500)
      .json({ message: "Could not update user", error: error.message });
  }
};

module.exports = updateUser;
