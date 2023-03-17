const Employee = require('../models/Employee');
const fs = require('fs');


// Get all employees
getAll = async (req, res) => {
  const hr = req.Hrid.id;
  try {
    const employees=[];
    const employeesArray= await Employee.find({hr}).sort({createdAt: -1});
    
    if(employeesArray.length>0){
    employeesArray.map((employee)=>{
      const imageName=employee.image;
      const image =fs.readFileSync(`./uploads/${imageName}`);
      const base64Image = Buffer.from(image).toString('base64');
      employee.image = `data:image/png;base64,${base64Image}`;
      employees.push(employee);
    })
  };
   
    res.status(200).json({ employees });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get an employee by ID
getById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    const imageName=employee.image;
      const image =fs.readFileSync(`./uploads/${imageName}`);
      const base64Image = Buffer.from(image).toString('base64');
      employee.image = `data:image/png;base64,${base64Image}`;

    res.status(200).json({ employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Create a new employee
create = async (req, res) => {
  try {
    const hr = req.Hrid.id;
    const {name,phone,email,position}=req.body;
    const { filename } = req.file;  
    const image = filename;
    
    const existingemp = await Employee.findOne({ email });
    if (existingemp) {
      return res.status(409).json({ error: 'Employee with this email already exists' });
    }

    const employee = new Employee({ name, phone, email, position, hr, image});
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Update an employee by ID
updateById = async (req, res) => {
  try {
    
    if (req.file) {
      const employeep = await Employee.findById(req.params.id);
      let path = `./uploads/${employeep.image}`;
      if(fs.existsSync(`./uploads/${path}`))fs.unlinkSync(path);
    }
    const hr = req.Hrid.id;
    const {name,phone,email,position}=req.body;
    const { filename } = req.file;
    const image =filename;

    const employeeupdate={
      name:name,
      phone:phone,
      email:email,
      position:position,
      image:image,
      hr:hr
    };

    const employee = await Employee.findByIdAndUpdate(req.params.id, employeeupdate, { new: true });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Delete an employee by ID
deleteById = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    let path = `./uploads/${employee.image}`;
    fs.unlinkSync(path);

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports={getAll,getById,create,updateById,deleteById}