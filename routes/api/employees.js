

// const express = require('express');
// const router = express.Router();
// const data = {};
// data.employees = require('../../model/employees.json');

// router.route('/')
//     .get((req, res) => { 
//         res.json(data.employees);
//     })
//     .post((req, res) => {
//         res.json({
//             'firstname': req.body.first,
//             'lastname': req.body.second
//         });
//     })
//     .put((req, res) => {
//         res.json({
//             'firstname': req.body.firstname,
//             'lastname': req.body.lastname
//         });
//     })
//     .delete((req, res) => {
//         res.json({ "id": req.body.id });
//     });


//    router.route('/:id')
//    .get((req,res)=>{
//     res.json({"id":req.params.id});
//    });

// module.exports = router;





// -----------------After MVC rest Api totorial start---------------

const express = require('express');
const router = express.Router();
const path = require('path');
const data = {};
data.employees = require('../../model/employees.json');
const employeesController = require('../../controllers/employeesController')
// const verifyJWT = require('../../middleware/verifyJWT')

router.route('/')
    // .get( verifyJWT ,employeesController.getALLEmployees)
    .get(employeesController.getALLEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);
 
   router.route('/:id')
   .get(employeesController.getEmployee);


module.exports = router;

