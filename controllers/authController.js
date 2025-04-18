const userSchema = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Session creation with the Help of global JWT
// const generateToken = (user) => {
//     return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//   };



// @route POST /api/user/register
// @access public 
exports.register = async (req,res)=> {
    const {name,email,password} = req.body;  
    
    // Check if all fields are provided
    if(!name || !password || !email){
        res.status(400);
        throw new Error("all fields are Mandatory!");
    }

    // Check if user already exists by email
    const userAvailable = await userSchema.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered with this email");
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the hashed password
    const user = new userSchema({
        name,
        email,
        password: hashedPassword,
    });
    
    {
        await user.save();
        res.status(200).json({message:"Register the user",statuscode:584});
    }
   
};
// discription login user 
// @route POST /api/user/loginUser
// @access public 
exports.login = async (req,res)=> {
    const { email, password } = req.body;

    // Check if all fields are provided
    if(!email|| !password){
        res.status(400);
        throw new Error('all field are mandatory');
    }

    // Find user by email
    const user = await userSchema.findOne({email});
    
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" }); 
    }
    //compare password with user hashed hashedpassword
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(" Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    };
    
    
    const accessToken = jwt.sign({
        user:{
            name: user.name,
            email: user.email,
            id: user._id,
        },
    },process.env.JWT_SECRET,
    { expiresIn: "60m" } 
);
    res.status(200).json({accessToken});
    
};



//module.exports = {register,login,};
