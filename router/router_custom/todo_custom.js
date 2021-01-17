const _ = require("lodash");
const shortid = require("shortid");
const todoModel = require("../../db/models/index").TODO;
const dbCommon = require("../../common/db.common");

const formError = (msg, status, data) => {
  return {
    msg: msg || "",
    status: status || "400",
    data: data || {},
  };
};

const formTodo = (requestBody) => {
  let obj = {
    code: shortid.generate(),
    name: requestBody.name,
    bucket_id: requestBody.bucket_id,
    marked: false,
    details: {},
  };
  return obj;
};

const addTodo = async (req, res) => {
  try {
    let requestBody = req.body;
    let todoName = _.get(requestBody, "name", "");
    let bucketId = _.get(requestBody, "bucket_id", "");

    if (_.isEmpty(todoName) || _.isEmpty(bucketId)) {
      return res.json(formError("todoName/bucketId Name required", "400", {}));
    }
    let newTodo = formTodo(requestBody);
    newTodo = new todoModel(newTodo);
    await newTodo.save();

    return res.json(formError("", "200", newTodo));
  } catch (e) {
    return res.json(formError(e, "400", {}));
  }
};

const updateTodo = async (req, res) => {
  try {
    let todoId = _.get(req, "params.id", "");
    let requestBody = _.get(req, "body", {});
    if (!todoId) {
      return res.json(formError("Todo id required", "400"));
    }
    let query = {
      code: todoId,
    };
    let updateQuery = {
      $set: {
        marked: requestBody.marked,
      },
    };
    let existTodo = await todoModel.findOneAndUpdate(query, updateQuery);
    return res.json(formError("", "200", existTodo));
  } catch (e) {
    return res.json(formError(e, "400"));
  }
};

const getAll = async (req, res) => {
  try {
    let getAll = await dbCommon.getData(todoModel, {});
    return res.json(formError("", "200", getAll));
  } catch (e) {
    res.json(formError(e, "400", {}));
  }
};

const deletById = async (req, res) => {
  try {
    let todoId = _.get(req, "params.id", "");
    console.log("todoId =------==>" + todoId);
    if (_.isEmpty(todoId)) {
      return res.json(formError("Todo id required", {}));
    }
    let query = {
      code: todoId,
    };
    let deleteData = await todoModel.deleteOne(query);
    return res.json(formError("", "200", deleteData));
  } catch (e) {
    return res.json(formError(e, "400"));
  }
};
const deleteAll = async (req, res) => {
  let deleteAll = await todoModel.deleteMany();
  res.json({});
};
module.exports = {
  ADD_TODO: addTodo,
  DELETE_TODO: deletById,
  UPDATE_TODO: updateTodo,
  GET_ALL_TODO: getAll,
  DELETE_ALL: deleteAll, // internal
};
