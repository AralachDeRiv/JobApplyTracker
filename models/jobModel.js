const mongoose = require("mongoose");
const validator = require("validator");

const employerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the employer name"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "This is not a valid email"],
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
});

const jobSchema = mongoose.Schema({
  jobTitle: {
    type: String,
    required: [true, "Please enter a job title"],
  },
  website: {
    type: String,
    validate: [validator.isURL, "This is not a valid url"],
  },
  employer: employerSchema,

  createdAt: {
    type: Date,
    default: Date.now,
  },

  expirationDate: {
    type: Date,
  },

  // de 1 à 2 [Candidature spontanée, job offer]
  origin: {
    type: String,
    validate: {
      validator: (v) => ["Candidature spontanée", "job offer"].includes(v),
      message: (prop) => `${prop} is not a valid option`,
    },
  },

  // status de 1 à 4 [Interested, CV sent, Interview, negative]
  status: {
    type: String,
    validate: {
      validator: (v) =>
        ["Interested", "CV sent", "Interview", "negative"].includes(v),
      message: (prop) => `${prop.value} is not a valid option`,
    },
    required:  [true, "Status is required"]
  },

  comment: {
    type: String,
  },

  jobSeeker: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

jobSchema.post("save", function (doc, next) {
  console.log("Job saved");
  next();
});

const Job = mongoose.model("job", jobSchema);

module.exports = Job;
