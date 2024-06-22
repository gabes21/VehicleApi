export const admin = (req, res, next) => {
    if (!req.user.roles.includes("admin")) {
        return next(new CustomError("Access denied. Your roles is not equipped with this capability", 403));
    }
    next();
}

export const editor = (req, res, next) => {
    if (!req.user.roles.includes("editor")) {
        return next(new CustomError("Access denied. Your roles is not equipped with this capability", 403));
    }
    next();
}

export const viewer = (req, res, next) => {
    if (!req.user.roles.includes("viewer")) {
        return next(new CustomError("Access denied. Your roles is not equipped with this capability", 403));
    }

    next();
}