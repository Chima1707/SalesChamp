const mongoose = require("mongoose");

const getAll = async (req, res, next) => {
  const Address = mongoose.model("Address");
  try {
    const addresses = await Address.find();
    return res.status(200).json(addresses);
  } catch (exeption) {
    next(exeption);
  }
};

const createOne = async (req, res, next) => {
  const Address = mongoose.model("Address");
  const address = new Address(req.body);
  try {
    const document = await address.save();
    res.set("Location", `${req.url}/${document._id}`);
    return res.status(201).json(document);
  } catch (exception) {
    next(exception);
  }
};

const getOne = async (req, res, next) => {
  const id = req.params.id;
  const Address = mongoose.model("Address");
  try {
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ error: `resource ${id} not found` });
    }
    return res.status(200).json(address);
  } catch (exception) {
    next(exception);
  }
};

const updateOne = async (req, res, next) => {
  const id = req.params.id;
  const Address = mongoose.model("Address");
  try {
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ error: `resource ${id} not found` });
    }
    if (
      address.status === "not interested" ||
      address.status === "interested"
    ) {
      return res
        .status(403)
        .json({ error: `resource ${id} can not be updated` });
    }
    if (req.body.name && req.body.name.trim()) {
      address.name = req.body.name;
    }
    if (req.body.email) {
      address.email = req.body.email;
    }
    address.status = req.body.status;
    const updatedAddress = await address.save();
    return res.status(200).json(updatedAddress);
  } catch (exception) {
    next(exception);
  }
};

const deleteOne = async (req, res, next) => {
  const id = req.params.id;
  const Address = mongoose.model("Address");
  try {
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ error: `resource ${id} not found` });
    }
    address.remove();
    return res.status(204).end();
  } catch (exeption) {
    // 409 ?
    next(exeption);
  }
};
module.exports = { getAll, createOne, getOne, updateOne, deleteOne };
