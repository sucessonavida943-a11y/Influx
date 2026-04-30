// errorHandler.js

// Error handling middleware for the Influx platform

const errorHandler = (err, req, res, next) => {
    // Handle validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: err.message,
            details: err.errors
        });
    }

    // Handle server errors
    if (err.name === 'ServerError') {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }

    // Handle custom errors
    if (err.isCustomError) {
        return res.status(err.status || 400).json({
            status: 'error',
            message: err.message,
        });
    }

    // Fallback for unknown errors
    return res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
    });
};

module.exports = errorHandler;