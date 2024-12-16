const data = {};
data.employees = require('../model/employees.json');

const  getALLEmployees = (req , res)=>{
    res.json(data.employees);
}

const createNewEmployee = (req , res)=>{
    res.json(
        {
        'firstname': req.body.first ,
        'lastname': req.body.second
});
}

const updateEmployee = (req , res)=>{
    res.json(
        {
        'firstname': req.body.first ,
        'lastname': req.body.second
});
}

const deleteEmployee = (req , res)=>{
    res.json({"id":req.body.id})
}
const getEmployee = (req , res)=>{
    res.json({"id":req.params.id})
}

module.exports = {

    getALLEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}
