
const _ = require('lodash')

const getData = async (model, query) => {
  try {
    let data = await model.find(query).lean();
    if (_.isEmpty(data)) {
      return {};
    } else {
      return data;
    }
  } catch (e) {
    console.error("Error while getdata", err);
    return {};
  }
};

const findOneData = async (model, query) => {
  try {
    let getData = await model.findOne(query).lean();
    if (_.isEmpty(getData)) {
      return {};
    } else {
      return getData;
    }
  } catch (e) {
    console.error("Error while findOneData", err);
    return {};
  }
};
module.exports = {
  getData: getData,
  findOne: findOneData,
};
