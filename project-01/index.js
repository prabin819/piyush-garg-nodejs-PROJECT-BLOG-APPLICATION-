const express = require('express');
const app = express();
const PORT = 3000;
const users = require('./MOCK_DATA.json');
const fs = require('fs');

//middleware
app.use(express.urlencoded({extended: false}));


//routes
app.get('/users',(req, res)=>{
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>`;

    res.send(html);
})


//REST APIs
app.get('/api/users',(req, res)=>{
    res.json(users);
})

// app.get('/api/users/:id',(req, res)=>{
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id)
//     res.json(user);
// })

app.post('/api/users',(req, res)=>{
    //TODO: Create new user
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title ) return res.status(400).json({msg:`all fields are required`});
    users.push({...body, id: users.length +1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), err => {
        if (err) {
          console.error(err);
        } else {
          // file written successfully
          return res.status(201).json({status: "successful addition", id: users.length});
        }
      });
})

// app.patch('/api/users/:id',(req, res)=>{
//     //TODO: Edit the user with id
//     return res.json({status: "pending"});
// })

// app.delete('/api/users/:id',(req, res)=>{
//     //TODO: Delete the user with id
//     return res.json({status: "pending"});
// })


app.route('/api/users/:id')
    .get((req, res)=>{
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        if(!user) return res.status(404).json({msg:`no user with id: ${id}`});
        return res.json(user);
        })
    .patch((req, res)=>{
        // const id = Number(req.params.id);
        // const { first_name, last_name, email, gender, job_title} = req.body;

        // const newusers = users.map(user => {
        //     if (user.id === id) {
        //         return { ...user, first_name: first_name,last_name: last_name,email: email, gender: gender, job_title: job_title};
        //     }
        //     return user;
        // });

        // fs.writeFile('./MOCK_DATA.json', JSON.stringify(newusers), err => {
        //     if (err) {
        //       console.error(err);
        //     } else {
        //       // file written successfully
        //       return res.json({status: "successful edit", id: users.length});
        //     }
        //   });

        const id = Number(req.params.id);
        const { first_name, last_name, email, gender, job_title} = req.body;

        for (let user of users) {
            if (user.id === id) {
                user.first_name = first_name,
                user.last_name = last_name,
                user.email = email,
                user.gender = gender,
                user.job_title = job_title
            }
        }

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), err => {
            if (err) {
              console.error(err);
            } else {
              // file written successfully
              return res.json({status: "successful edit", id: id});
            }
          });
    })
    .delete((req, res)=>{
        const id = Number(req.params.id);
        
        users.splice(users.findIndex(user => user.id === id),1);

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), err => {
            if (err) {
              console.error(err);
            } else {
              // file written successfully
              return res.json({status: "successful deletion", id: id});
            }
          });
    })


app.listen(PORT,()=>{console.log(`server started at PORT: ${PORT}`)});