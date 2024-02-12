const express = require('express')
const router = express.Router()
const {Contact} = require('../models/Contact')
const mongoose = require('mongoose')
const {HOME,CREATE_CONTACT,GETALLCONTACTS,GETSINGLECONTACT,DELETE_CONTACT,UPDATE_CONTACT} = require('../controllers/contactControllers')
//home
router.get("/",HOME)

router.post('/contacts',CREATE_CONTACT)

router.get('/contacts',GETALLCONTACTS)

router.get('/contacts/:id',GETSINGLECONTACT)

router.put('/contacts/:id',UPDATE_CONTACT)

router.delete('/contacts/:id',DELETE_CONTACT)


module.exports = router