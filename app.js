const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");

const Router = require("./routes/routes");

dotenv.config();
const urlAtlasDB = `mongodb+srv://${process.env.user_admin_atlas}:${process.env.atlas_admin_password}@cluster0.4hbl5tb.mongodb.net/job-apply-tracker?retryWrites=true&w=majority&appName=Cluster0`;

const PORT = 3000;
const app = express();
mongoose.connect(urlAtlasDB).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`);
  });
});

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use(Router);

// const User = require("./models/userModel");
// const { handleErrors } = require("./services/errorsHandler");
// const start = async () => {
//   try {
//     const user = await User.create({
//       firstname: "John",
//       lastname: "Doe",
//       email: "john.doe@example.com",
//       profilPicture: "http://example.com/john.jpg",
//       CVpdf: "http://example.com/john-cv.pdf",
//       password: "securePassword123",
//     });
//     console.log(user);
//   } catch (err) {
//     let errors = handleErrors(err);
//     console.log(errors);
//   }
// };

// start();

// const Job = require("./models/jobModel");
// const { handleErrors } = require("./services/errorsHandler");

// const start = async () => {
//   try {
//     const result = await Job.create({
//       jobTitle: "Software Engineer",
//       website: "https://example.com",
//       employer: {
//         name: "Tech Innovators Inc.",
//         email: "contact@techinnovators.com",
//         phoneNumber: "+1234567890",
//         address: "123 Tech Avenue, Silicon Valley, CA 94043",
//       },
//       expirationDate: "2024-12-31T23:59:59Z",
//       origin: "job offer",
//       status: "Interested",
//       comment: "Looking forward to discussing this opportunity.",
//     });
//     console.log(result);
//   } catch (err) {
//     console.log(err.message);
//     const errors = handleErrors(err);
//     console.log(errors);
//   }
// };

// start();
