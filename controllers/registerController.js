

const userDB = {
    users: require('../model/users.json'),
    setUsers: function(data){
        this.users = data;
    }
};

const bcrypt = require('bcrypt');
const path = require('path');
const fspromise = require('fs').promises;

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body; 
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
   
    const duplicate = userDB.users.find(person => person.username === user);
    if (duplicate) return res.sendStatus(409); // Conflict
   
    try {
        // Encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10); // Add `await` and use a salt round of 10
        
        // Make new user and password
        const newUser = { "username": user, "password": hashedPwd }; // Corrected from `users` to `user`
        
        // Add the new data to userDB
        userDB.setUsers([...userDB.users, newUser]);
        
        // Write updated users data to the JSON file
        await fspromise.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'), 
            JSON.stringify(userDB.users, null, 2) // Pretty format JSON
        );

        console.log(userDB.users);
        res.status(201).json({ "success": `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

module.exports = { handleNewUser };


