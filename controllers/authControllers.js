import userModel from '../models/userModel.js';
import errorResponse from '../utils/errorResponse.js';

// JWT token
export const sendToken = (user, statusCode, res) => {
  const token = user.getSignedIn(res);
  res.status(statusCode).send({
    success: true,
    token
  });
};

export const registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return next(new errorResponse('Email already registered', 500));
    }
    const user = await userModel.create({
      username,
      email,
      password
    });
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new errorResponse('Please provide email or password'));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse('Invalid Credential', 401));
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse('Invalid Credential', 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logoutController = async (req, res) => {
  res.clearCookie('refreshToken');
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};
