const fetchUsers = userModel => {
  return userModel.findAll({ raw: true })
    // return a plain array of objects
    .then(resp => {
      if (!resp || resp === null) return { data: [], error: false, message: "not data found" }
      return { data: resp, error: false, message: "success" }
    })
    .catch(err => console.log('err ', err))
}

const authUser = reqParams => {
  // validate required parameters
  if (!reqParams['user']) return { error: true, message: 'user required', 'data': [] }
  if (!reqParams['password']) return { error: true, message: 'password required', 'data': [] }
  // TODO generate token and return it to the client
  return { error: false, message: 'welcome to the app', 'data': [] }
}

module.exports = {
  fetchUsers,
  authUser
}
