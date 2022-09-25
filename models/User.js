// bring in components from mongoose for creating module
const { Schema, model } = require("mongoose");
// validator to proofreading requirements
const { isLength } = require("validator");

// create schema to be used for creating new Users in db
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      // need to set up backend validation
    },
    password: {
      type: String,
      required: [true, "You must provide a password"],
      validate: [
        (value) => isLength(value, { min: 6 }),
        "Your password must be at least 6 characters long",
      ],
    },
    role: {
      type: String,
      default: 1,
      enum: [1, 2, 3, 4],
    },
    // add any other necessary parameters to be included in user schema
    dateCreated: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
