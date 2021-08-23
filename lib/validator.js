const { body } = require("express-validator");
const createSchema = {
  country: {
    isISO31661Alpha2: {
      errorMessage: "country should be an ISO 3166-1 alpha 2 country codes.",
    },
  },
  city: {
    notEmpty: {
      errorMessage: "city is required.",
    },
  },
  street: {
    notEmpty: {
      errorMessage: "street is required.",
    },
  },
  postalcode: {
    matches: {
      options: [/^\d{5}$/, "g"],
      errorMessage:
        "postal code should be 5 characters and only contain digits.",
    },
  },
  number: {
    matches: {
      options: [/^\+?\d+$/, "g"],
      errorMessage: "number should be a positive integer.",
    },
    toInt: true,
  },
  numberAddition: {
    isString: {
      errorMessage: "numberAddition should be a string.",
    },
  },
};

const updateValidator = [
  body("status").custom((value) => {
    const AllowedValues = ["not interested", "interested", "not at home"];
    if (AllowedValues.includes(value)) {
      return true;
    }
    throw new Error(`status should be one of ${AllowedValues.join(", ")}.`);
  }),
  body("name").custom((value) => {
    if (value && typeof value !== "string") {
      throw new Error("name should be a string.");
    }
    return true;
  }),
  body("email").custom((value) => {
    if ((value && typeof value !== "string") || !IsValidEmail(value)) {
      throw new Error("email is not a valid email address.");
    }
    return true;
  }),
];

function IsValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = { createSchema, updateValidator };
