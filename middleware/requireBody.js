export default function requireBody(requiredKeys) {
  return (req, res, next) => {
    let missingKeys = [];

    for (const key of requiredKeys) {
      if (!(key in req.body)) {
        missingKeys.push(key);
      }
    }

    if (missingKeys.length > 0) {
      return res
        .status(400)
        .send(`Request body must include: ${missingKeys.join(", ")}`);
    }

    next();
  };
}
