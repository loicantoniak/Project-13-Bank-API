const accountService = require('../services/accountService')

module.exports.createAccount = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await accountService.createAccount(req.body)
    response.status = 200
    response.message = 'Account successfully created'
    response.body = responseFromService
  } catch (error) {
    console.error('Something went wrong in accountController.js', error)
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.getUserAccounts = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await accountService.getUserAccounts(req)
    response.status = 200
    response.message = 'Successfully got user accounts data'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in accountController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.getAccountTransactions = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await accountService.getAccountTransactions(req)
    response.status = 200
    response.message = 'Successfully got account transactions data'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in accountController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}