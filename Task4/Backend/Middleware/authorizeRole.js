const authorizeRole = (...permittedRoles) => {
    return (req, res, next) => {
      if (!req.user || !permittedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: "Access denied" });
      }
      next();
    };
  };
  
  module.exports = authorizeRole;
  