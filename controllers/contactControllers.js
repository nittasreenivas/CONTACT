const {Contact} = require('../models/Contact')
const mongoose = require('mongoose')

exports.HOME = (req,res) => {
    res.send(`hii welcome to express home Route vasu`)
}

exports.CREATE_CONTACT = async (req,res) => {
    try{
        if(!req.body.firstname){
            return res.status(422).json({err:"Firstname is required"})
        }
        if(!req.body.lastname){
            return res.status(422).json({err:"lastname is required"})
        }
        if(!req.body.email){
            return res.status(422).json({err:"email is required"})
        }
        if (!req.body.phoneNumber) {
            return res.status(422).json({ err: "PhoneNumber is required" });
        }

        // Validate phoneNumber to have exactly 10 numbers
        const phoneNumberRegex = /^\d{10}$/;
        if (!phoneNumberRegex.test(req.body.phoneNumber)) {
            return res.status(422).json({ err: "PhoneNumber must be a 10-digit number" });
        }
        const newContact =  await Contact.create(req.body)
        return res.status(201).json({msg:"Contact succesfully created",data:newContact})
    }catch(err){
        return res.status(500).json({msg:"Contact did not created",data:err})
    }
}

exports.GETALLCONTACTS = async (req,res) => {
    try{
        const getAllContacts = await Contact.find()
        return res.status(200).json({msg:"Contacts fetched succesfully",data:getAllContacts})
    }catch(err){
        return res.status(500).json({error:"fetching all contacts failed"})
    }
}

exports.GETSINGLECONTACT = async (req,res) => {
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(404).json({err:"Paramneter is not a valid id"})
        }
        const singleContact = await Contact.findById(req.params.id)
        if(!singleContact){
            return res.status(404).json({err:"Contact not created"}) 
        }
        return res.status(200).json({msg:"singleContact fetched succesfully",data:singleContact})
    }catch(err){
        return res.status(500).json({error:"singleContact  failed",data:err})
    }
}

exports.DELETE_CONTACT = (req,res) => {
    Contact.deleteOne({_id:req.params.id}).then((delprod) => {
        return res.status(200).json({msg:"Product deleted Succesfully",data:delprod})
    }).catch((err) => {
        return res.status(500).json({msg:"Product didnot delete Succesfully",data:err})
    })
}

exports.UPDATE_CONTACT = async (req,res) => {
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(404).json({err:"Paramneter is not a valid id"})
        }
        const updateContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
        
        return res.status(200).json({msg:"updateContact fetched succesfully",data:updateContact})
    }catch(err){
        return res.status(500).json({error:" updateContact  failed",data:err})
    }
}