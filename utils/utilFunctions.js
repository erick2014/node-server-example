var moment = require("moment");
var Sequelize = require('sequelize')

const getCurrentDateParsed = () => {
  return moment(new Date(), 'America/Bogota').format('YYYY-MM-DD HH:mm:ss');
}

const getDateOnly = () => {
  return moment(new Date(), 'America/Bogota').format('YYYY-MM-DD');
}

const formatDate = date => {
  return moment(new Date(date), "America/Bogota").format("YYYY-MM-DD HH:mm:ss");
}

/*Remove spaces at the beginning and at the end of an object's key*/
const trimSpacesForFields = (fieldsObj) => {
  let newObj = {};
  for (i in fieldsObj) {
    let objKey = i.trim();
    newObj[objKey] = fieldsObj[i];
  }
  return newObj;
}

const validateDateField = value => {
  const pattern = new RegExp(/^\d{4}[-]\d{2}[-]\d{2}$/)
  return value.match(pattern);
}

const validateIntField = value => {
  return isNaN(parseInt(value))
}

const validateStringField = value => {
  return isNaN(value)
}

const validateFields = (receivedFields, expectedFields) => {
  //check if we've received all fields
  if (!(Object.keys(receivedFields).length === Object.keys(expectedFields).length)) {
    return { error: "all parameters required", data: [] };
  }
  //validate each field type
  for (var f in receivedFields) {
    let fieldValue = receivedFields[f]

    let fieldType = expectedFields[f] ? expectedFields[f]['type'] : ''

    //if the field is not in the expected fields
    if (!fieldValue) {
      return { error: `${f} is required`, data: [] };
    }

    //if the field is int, check if is valid
    else if (fieldType == 'int') {
      if (validateIntField(fieldValue)) return { error: `${f} is invalid`, data: [] };
    }

    //if the field is date, check if is valid
    else if (fieldType == 'date') {
      if (!validateDateField(fieldValue)) return { error: `${f} is invalid`, data: [] };
    }

    else if (fieldType == 'string') {
      if (!validateStringField(fieldValue)) return { error: `${f} is invalid`, data: [] };
    }
    //if the expected field is different from the received param
    else if (!expectedFields[f]) {
      return { error: `${f} param is not valid`, data: [] };
    }

  }
  //of everythin went okay, then return true
  return true
}

module.exports = {
  getDateParsed: getCurrentDateParsed,
  getDateOnly,
  trimSpacesForFields,
  validateDateField,
  validateIntField,
  validateFields,
  formatDate,

}
