const jwt = require('jsonwebtoken');
require('dotenv').config();

// Secret key (must match the one in your .env file)
const secret = process.env.JWT_SECRET || "sanjanaavnish";

/**
 * Generate a JWT with the given payload and options.
 * 
 * @param {Object} payload - Data to encode in the token (e.g., user ID, email).
 * @param {Object} options - Token options (e.g., expiration time).
 * @returns {string} - The generated JWT.
 */
const generateToken = (payload, options = { expiresIn: '8h' }) => {
  try {
    const token = jwt.sign(payload, secret, options);
    return token;
  } catch (error) {
    console.error('Error generating token:', error.message);
    throw error; // Rethrow error for the caller to handle
  }
};

// Example usage
if (require.main === module) {
  // Generate a sample token if the script is run directly
  const samplePayload = { id: '123098', email: 'sanju@gmail.com' };
  const token = generateToken(samplePayload);
  console.log('Generated JWT:', token);
}

module.exports = generateToken;