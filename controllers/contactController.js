const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const Contact = require("../models/contactModel");


//@access private
const getContact=asyncHandler(async(req,res)=>{
    const contacts = await Contact.find({user_id: req.user._id});
    if(!contacts){
        res.status(404);
        throw new Error("No contacts found");
    }
    res.status(200).json(contacts);
});

//@access private
const createContact = asyncHandler(async(req,res)=>{
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    res.status(201).json(contact);
});

//access private
const getContactById = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@access private
const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user._id){
        res.status(403);
        throw new Error("User not authorized to update this contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});  
    if(!updatedContact){
        res.status(400);
        throw new Error("Contact not found");
    }
    res.status(200).json(updatedContact);
});

//@access private
const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User not authorized to delete this contact");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
});


module.exports={
    getContact,
    createContact,
    updateContact,
    deleteContact,
    getContactById
}