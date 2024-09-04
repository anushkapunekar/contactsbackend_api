const asyncHandler = require("express-async-handler");
const Contact = require ("../models/contactmodel");
//@desc get all contacts
//@routes GET /api/contacts
//@access private

const getContact = asyncHandler(async(req , res)=> {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
}
);
//@desc create all contacts
//@routes POST /api/contacts
//@access private

const createContact =  asyncHandler(async(req , res)=> {
    console.log("the request body is :" , req.body);
    const { name , phone , email} = req.body;
    if (!name|| !phone || !email   ){
        res.status(400);
        throw new Error('All fields are Mandatory');
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(200).json(contact);
});

//@desc update all contacts
//@routes put /api/contacts
//@access private
const updateContact = asyncHandler(async (req , res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not updated");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission to update");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true}
    );
    res.status(200).json(updatedContact);
});

//@desc get all contacts
//@routes GET /api/contacts
//@access private
const getContacts = asyncHandler(async(req , res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("contact not found");
    } 
    // res.status(200).json({message:`get all contacts for ${req.params.id}`});
    res.status(200).json(contact);
});

//@desc delete all contacts
//@routes delete /api/contacts
//@access private
const deleteContact = asyncHandler(async(req , res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found")
    }
    {
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission to update");
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
}});







module.exports= {getContact ,createContact , updateContact,deleteContact ,getContacts};