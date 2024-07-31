const Job = require("../models/jobModel");
const { handleErrors } = require("../services/errorsHandler");

const addJob = async (req, res, next) => {
  try {
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
      jobSeeker,
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
      jobSeeker,
    });

    res.json(job);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

// http://localhost:3000/job?numPage=0&limit=3&asc=true&userid=12345&orderedBy=employer.name&ByStatus=Interested
const getJobs = async (req, res, next) => {
  let { numPage, limit, ByStatus, orderedBy, desc } = req.query;

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
      $match: {},
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

const getJob = async (req, res, next) => {
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
    const id = "66a78e0c8edf52e18dbea404";
    const updates = req.body;
    const result = await Job.updateOne({ _id: id }, { $set: updates });
    res.json(result);
  } catch (err) {
    const errors = handleErrors(err);
    res.json(errors);
  }
};

module.exports = {
  addJob,
  getJobs,
  getJob,
  updateJob,
};
