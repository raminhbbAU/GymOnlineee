const router = require('express').Router();
const models  = require('../models/sequlizeDb.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authToken = require('../services/auth.service.js');
const yupValidator = require('../services/validation.service.js');

module.exports = {router,models,bcrypt,jwt,authToken,yupValidator}