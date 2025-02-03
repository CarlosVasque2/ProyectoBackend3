function errorHandler(err, req, res, next) {
    console.error(err);

    if (err.status) {
        return res.status(err.status).json({
            status: "error",
            message: err.message || "An error occurred",
        });
    }

    // Si no es un error manejado, enviar error 500
    res.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
}

export default errorHandler;

