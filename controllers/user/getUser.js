const User = require("../../models/User");

const getUser = async (req, res) => {
  try {
    let foundUser;

    // Check if it's a request by userId (from params)
    if (req.params.userId) {
      const { userId } = req.params;

      // Validate userId
      if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
      }

      // Search for the user by ID
      foundUser = await User.findById(userId);
    }
    // Check if it's a request by email (from query)
    else if (req.query.email) {
      const { email } = req.query;

      // Validate email
      if (!email) {
        return res.status(400).json({ message: "Email is required." });
      }

      // Search for the user by email
      foundUser = await User.findOne({ email });
    } else {
      return res
        .status(400)
        .json({ message: "User ID or email is required." });
    }

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
};

module.exports = getUser;
        .json({ message: "Could not retrieve user", error: error.message });
    }
  }
};

module.exports = getUser;
