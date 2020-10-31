const express = require('express')
const User = require('../models/user')

const router = express.Router()

router.get('/', async (req, res) => {
  res.send(await User.find())
})

router.post('/', async (req, res) => {
  const doc = await User.create(req.body)
  res.status(200).send(doc)
})

module.exports = router
