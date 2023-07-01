import errorResponse from "../utils/errorResponse";

const errorHandler = async (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose cast error
  if (err.name === "CastError") {
    const message = "Resource Not Found";
    error = new errorResponse(message, 404);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new errorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new errorResponse(message, 400);
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.message || "Server Error",
    });
  }
};

export default errorHandler;
