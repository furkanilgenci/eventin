const express = require('express')
const Event = require('../models/event')

const router = express.Router()

router.get('/all', async (req, res) => {
  const docs = await Event.find()
  res.status(200).send(docs)
})

router.get('/:id', async (req, res) => {
  const doc = await Event.findById(req.params.id)
  res.status(200).send(doc)
})

router.post('/', async (req, res) => {
  try {
    const doc = await Event.create(req.body)
    res.status(200).send(doc)
  } catch (error) {
    res.sendStatus(500)
  }
})

module.exports = router
