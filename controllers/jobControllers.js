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

    console.log(job);

    next();
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

// http://localhost:3000/job?numPage=0&limit=3&asc=true&userid=12345&orderedBy=employer.name&ByStatus=Interested
const getJobs = async (req, res, next) => {
  let { numPage, limit, ByStatus, orderedBy, asc, userid } = req.query;

  numPage = Number(numPage) || 0;
  limit = Number(limit) || 15;

  ByStatus = { status: ByStatus } || {};
  console.log(ByStatus);
  asc = asc == "true" ? 1 : -1;
  orderedBy = orderedBy || "expirationDate";

  let sortCriteria = {};
  if (orderedBy === "employer.name") {
    sortCriteria["employer.name"] = asc;
  } else {
    sortCriteria[orderedBy] = asc;
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
            $skip: numPage * limit,
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

module.exports = {
  addJob,
  getJobs,
};
