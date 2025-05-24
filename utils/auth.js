const JWT = require("jsonwebtoken");

// Generate Token for User Login
function generateToken(user, callback) {
  const payload = {
    userID: user._id,
  };
  const secretKey = process.env.JWT_SECRET_KEY;
  const options = {
    expiresIn: "10m",
    issuer: "AuthFlow",
  };
  // Create Token
  JWT.sign(payload, secretKey, options, (error, token) => {
    if (error) {
      return callback(error, null);
    } else {
      return callback(null, token);
    }
  });
}

// Verify User Login Token
function verifyToken(token) {
  const secretKey = process.env.JWT_SECRET_KEY;

  try {
    const payload = JWT.verify(token, secretKey);
    return { valid: true, payload: payload, error: null };
  } catch (error) {
    return { valid: false, payload: null, error: error };
  }
}

// Export Token Auth Functions
module.exports = { generateToken, verifyToken };
