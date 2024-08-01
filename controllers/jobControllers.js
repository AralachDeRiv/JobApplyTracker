const { json } = require("stream/consumers");
const Job = require("../models/jobModel");
const { handleErrors } = require("../services/errorsHandler");
const { getIdFromToken, verifyToken } = require("../services/jwtToken");
const mongoose = require("mongoose");

const addJob = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const userId = getIdFromToken(token);
    // console.log(userId);

    const {
      name,
      email,
      phoneNumber,
      address,
      jobTitle,
      website,
      expirationDate,
      origin,
      status,
      comment,
    } = req.body;

    const job = await Job.create({
      employer: {
        name,
        email,
        phoneNumber,
        address,
      },
      jobTitle,
      website,
      expirationDate,
      origin,
      status,
      comment,
      jobSeeker: userId,
    });

    res.json(job);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

// http://localhost:3000/job?numPage=0&limit=3&asc=true&userid=12345&orderedBy=employer.name&ByStatus=Interested
const getJobs = async (req, res) => {
  let { numPage, limit, ByStatus, orderedBy, desc } = req.query;
  const token = req.cookies.jwt;
  let userId;
  try {
    userId = getIdFromToken(token);
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json(errors);
  }
  const userObjectId = new mongoose.Types.ObjectId(userId);

  numPage = Number(numPage) || 1;
  limit = Number(limit) || 999;

  if (ByStatus) {
    ByStatus = { status: ByStatus };
  }
  if (!ByStatus) {
    ByStatus = {};
  }

  let direction = desc == "true" ? -1 : 1;
  orderedBy = orderedBy || "expirationDate";

  let sortCriteria = {};
  if (orderedBy === "employer.name") {
    sortCriteria["employer.name"] = direction;
  } else {
    sortCriteria[orderedBy] = direction;
  }

  let result = await Job.aggregate([
    {
      $match: { jobSeeker: userObjectId },
    },
    {
      $match: ByStatus,
    },
    {
      $facet: {
        metaData: [
          {
            $count: "totalDocuments",
          },
          {
            $addFields: {
              numPage: numPage,
              totalPages: { $ceil: { $divide: ["$totalDocuments", limit] } },
            },
          },
        ],
        data: [
          {
            $sort: sortCriteria,
          },
          {
            $skip: (numPage - 1) * limit,
          },
          {
            $limit: limit,
          },
        ],
      },
    },
  ]);
  result = result[0];
  result.metaData = { ...result.metaData[0], count: result.data.length };
  res.json(result);
};

//
const getJob = async (req, res) => {
  const { id } = req.query;
  try {
    const job = await Job.findById(id);
    res.json(job);
  } catch (err) {
    res.json(err);
  }
};

const updateJob = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const userId = getIdFromToken(token);
    const { id } = req.query;
    const job = await Job.findById(id);

    if (job.jobSeeker == userId) {
      const updates = req.body;
      const result = await Job.updateOne({ _id: id }, { $set: updates });
      res.json(result);
    } else {
      res.status(400).json({ Error: "What are u doing here?" });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports = {
  addJob,
  getJobs,
  getJob,
  updateJob,
};
