const express = require('express')
const passport = require('passport')
const router = express.Router()
const handleResponse = require('../utils/response')

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     description: login authentication
 *     responses:
 *        '200':
 *          description: Successfully returned all user
 *        '500':
 *          description: Failed to query for users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         in: body
 *         required: true
 *         type: string
 */
router.post(
  '/login',
  passport.authenticate('passportLogin', {
    failureRedirect: '/api/auth/login',
  }),
  async function (req, res) {
    const { error } = req.user
    req.session.user = req.user
    req.next()

    if (error === 'empty')
      return handleResponse(
        req,
        res,
        403,
        null,
        'input field(s) cannot be empty',
      )
    else if (error === 'password')
      return handleResponse(req, res, 403, null, 'invalid password')
    else if (error === 'email')
      return handleResponse(req, res, 403, null, 'invalid email address')
    else return handleResponse(req, res, 204, { id: req.user.id })
  },
)

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     description: user registration
 *     responses:
 *        '403':
 *          description: validation error
 *        '200':
 *          description: successfully registered
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: fullname
 *         in: body
 *         required: true
 *         type: string
 *       - name: email
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         in: body
 *         required: true
 *         type: string
 *       - name: confirmpassword
 *         in: body
 *         required: true
 *         type: string
 *       - name: phonenumber
 *         in: body
 *         required: true
 *         type: string
 */
router.post(
  '/register',
  passport.authenticate('passportRegister', {
    failureRedirect: '/api/auth/login',
  }),
  async (req, res) => {
    const { validationError } = req.user
    if (validationError)
      return handleResponse(
        req,
        res,
        403,
        null,
        validationError.details[0].message,
      )
    else return handleResponse(req, res, 200)
  },
)

/**
 * @openapi
 * /api/auth/update:
 *   post:
 *     description: update user password
 *     responses:
 *        '403':
 *          description: invalid email
 *        '200':
 *          description: successfully updated
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         in: body
 *         required: true
 *         type: string
 */
router.post(
  '/update',
  passport.authenticate('passportUpdate', {
    failureRedirect: '/api/auth/login',
  }),
  async (req, res) => {
    const { validationError, error } = req.user
    if (validationError)
      return handleResponse(
        req,
        res,
        403,
        null,
        validationError.details[0].message,
      )
    else if (error)
      return handleResponse(req, res, 403, null, 'invalid email address')
    else return handleResponse(req, res, 200)
  },
)


router.get('/login', (req, res) => {
  return handleResponse(req, res, 500, null, 'login failed')
})

// /**
//  * @openapi
//  * /api/auth/logout:
//  *   get:
//  *     description: user logout
//  *     responses:
//  *        '201':
//  *          description: successfully logout
//  *     produces:
//  *       - application/json
//  */
router.get('/logout', (req, res) => {
  console.log(req.session.user)
  req.logout()
  req.session = null
  return handleResponse(req, res, 201)
})

module.exports = router
