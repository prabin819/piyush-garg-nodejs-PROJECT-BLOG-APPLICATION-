const User = require('../models/user');

async function handleGetAllUsers(req, res){
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res){
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({msg:`no user with id: ${id}`});
    return res.json(user);
}

async function handleEditUserById(req, res){
    await User.findByIdAndUpdate(req.params.id,{lastName: "manandhar"});
    return res,json({status: "Success"});
}

async function handleDeleteUserById(req, res){
    await User.findByIdAndDelete(req.params.id,{lastName: "manandhar"});
    return res.json({status: "Success"});
}

async function handleCreateUser(req, res){
        const body = req.body;
        if(!body || !body.firstName || !body.lastName || !body.email || !body.gender || !body.jobTitle ) 
            return res.status(400).json({msg:`all fields are required`});
    
        const result = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            jobTitle: body.jobTitle
        })
    
        return res.status(201).json({status: "Success", id: result._id});
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleEditUserById,
    handleDeleteUserById,
    handleCreateUser
}