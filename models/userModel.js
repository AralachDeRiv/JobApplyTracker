const mongoose = require("mongoose");
const argon2 = require("argon2");
const validator = require("validator");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please enter a firstname"],
  },
  lastname: {
    type: String,
    required: [true, "Please enter a lastname"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "This is not a valid email"],
  },
  profilPicture: {
    type: String,
  },
  CVpdf: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
});

// très très moyen je sais :)
function isArgon2Hash(hash) {
  return typeof hash === "string" && hash.startsWith("$argon2");
}
// Hashage du mot de passe
userSchema.pre("save", async function (next) {
  if (!isArgon2Hash(this.password)) {
    this.password = await argon2.hash(this.password);
  }
  next();
});

userSchema.post("save", function (doc, next) {
  console.log("Data has been saved");
  next();
});

userSchema.virtual("fullname").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await argon2.verify(user.password, password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
