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
      if(employee.image){
      const imageName=employee.image;
      try{
        const image =fs.readFileSync(`./uploads/${imageName}`);
      const base64Image = Buffer.from(image).toString('base64');
      employee.image = `data:image/png;base64,${base64Image}`;
      }
      catch(error){
        if(error.errno ===-2)
        employee.image='';
        console.log(' employee image not found');
        
      }
      
      }
      employees.push(employee);
    })
  };
   
    res.status(200).json({ employees });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error -01' });
  }
};

// Get an employee by ID
getById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    

    res.status(200).json({ employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error -02' });
  }
};



// Create a new employee
create = async (req, res) => {
  try {
    const hr = req.Hrid.id;
    const {name,phone,email,position}=req.body;
    let image=null;
    if(req.file){
    const { filename } = req.file; 
    image=filename;
    } 
    
    const existingemp = await Employee.findOne({ email });
    if (existingemp) {
      return res.status(409).json({ error: 'Employee with this email already exists' });
    }

    const employee = new Employee({ name, phone, email, position, hr, image});
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error-03' });
  }
};


// Update an employee by ID
updateById = async (req, res) => {
  try {
    const hr = req.Hrid.id;
    const { name, phone, email, position, image } = req.body;
    let employeeUpdate = {
      name,
      phone,
      email,
      position,
      image,
      hr
    };

    if (req.file) {
      const { filename } = req.file;
      employeeUpdate.image = filename;

      const employee = await Employee.findById(req.params.id);
      if (employee.image) {
        const path = `./uploads/${employee.image}`;
        if (fs.existsSync(path)) {
          fs.unlinkSync(path);
        }
      }
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, employeeUpdate, { new: true });
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
    res.status(500).json({ error: 'Internal server error-04' });
  }
};
module.exports={getAll,getById,create,updateById,deleteById}