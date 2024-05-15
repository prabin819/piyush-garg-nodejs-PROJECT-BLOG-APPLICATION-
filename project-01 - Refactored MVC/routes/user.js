const express = require('express');
const User = require('../models/user');
const {handleGetAllUsers,
    handleGetUserById,
    handleEditUserById,
    handleDeleteUserById,
    handleCreateUser
} = require('../controllers/user');

const router = express.Router();

//routes
// router.get('/users',async (req, res)=>{
//     const allDbUsers = await User.find({});
//     const html = `
//     <ul>
//         ${allDbUsers
//             .map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
//     </ul>`;

//     res.send(html);
// })


//REST APIs
router.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateUser)


router.route('/:id')
    .get(handleGetUserById)
    .patch(handleEditUserById)
    .delete(handleDeleteUserById)



module.exports = router;