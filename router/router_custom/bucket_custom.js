const _ = require("lodash");
const shortid = require("shortid");
const bucketModel = require("../../db/models/index").BUCKET;
const dbCommon = require("../../common/db.common");

const formError = (msg, status, data) => {
  return {
    msg: msg || "",
    status: status || "400",
    data: data || {},
  };
};

const formBucket = (requestBody) => {
  let obj = {
    code: requestBody.code || shortid.generate(),
    name: requestBody.name,
    marked_as_imp: requestBody.marked || false,
    details: {},
  };
  return obj;
};

const addBucket = async (req, res) => {
  try {
    let requestBody = req.body;
    let bucketName = _.get(requestBody, "name", "");
    if (_.isEmpty(bucketName)) {
      return res.json(formError("Bucket Name required", "400", {}));
    }
    let newBucket = formBucket(requestBody);
    let query = {
      code: newBucket.code,
    };
    let newBucketUpdate = await bucketModel.update(query, newBucket, {
      upsert: true,
    });

    return res.json(formError("", "200", newBucket));
  } catch (e) {
    return res.json(formError(e, "400", {}));
  }
};

const updateBucket = async (req, res) => {
  try {
    let bucketId = _.get(req, "params.id", "");
    let requestBody = _.get(req, "body", {});
    let updateName = _.get(requestBody, "name", "");
    if (!bucketId) {
      return res.json(formError("Bucket id required", "400"));
    }
    let query = {
      code: bucketId,
    };
    console.log(query);
    console.log(updateName);
    let existBucket = await bucketModel.findOne(query);
    if (!_.isEmpty(existBucket)) {
      _.set(existBucket, "name", updateName);
      console.log(updateName);
    } else {
      return res.json(formError("Bucket not exists", "400"));
    }
    existBucket.markModified("name");
    existBucket.save((err) => {
      console.log("in save");
      if (err) {
        return res.json(formError("Error while updating bucket", "400"));
      }
      return res.json(formError("", "200", existBucket));
    });
  } catch (e) {
    return res.json(formError(e, "400"));
  }
};

const getAll = async (req, res) => {
  try {
    let getAllData = await dbCommon.getData(bucketModel, {});
    return res.json(formError("", "200", getAllData));
  } catch (e) {
    res.json(formError(e, "400", {}));
  }
};

const deleteAll = async (req, res) => {
  let deleteAll = await bucketModel.deleteMany();
  res.json({});
};
module.exports = {
  ADD_BUCKET: addBucket,
  UPDATE_BUCKET: updateBucket,
  GET_ALL_BUCKET: getAll,
  DELETE_ALL: deleteAll, // interal
};
