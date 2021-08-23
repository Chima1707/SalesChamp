const parse = require("co-body");

module.exports = async (req, res, next) => {
  try {
    const body = await parse.json(req);
    req.body = body;
    next();
  } catch (exception) {
    return res.status(415).end();
  }
};
