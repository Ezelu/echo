import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';




// SIGN IN
export const signIn = async (req, res) => {
  const { email, password } = req.body

  // Check if User exists by searching for email
  // If user exists, check if passwords match with the existing user
  try {
    const existingUser = await User.findOne({ email });
    if ( !existingUser ) {
      return res.status(404).json({'message': "User doesn't exist!"});
    }

    const isPasswordCorrect = await bcrypt.compare( password, existingUser.password );
    if( !isPasswordCorrect ) {
      return res.status(404).json({'message': "Incorrect Password!"})
    }

    // Get jwt and signin user if credentials are correct
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id, },
      'test',
      {expiresIn: '1h'}
    )
  
    res.status(200).json({result: existingUser, token})
  } 

  catch (error) {
    return res.status(500).json({"message": error.message})
  }
}









// REGISTER
export const register = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  // Check if user already exists
  // If user doesn't exist, check if both passwords match
  try {
    const existingUser = await User.findOne({ email });
    if(existingUser) {
      return res.status(400).json({'message': "User already exists"})
    }

    const passwordsMatch = password === confirmPassword;
    if(!passwordsMatch) {
      return res.status(400).json({'message': "Passwords don't match"})
    }

    // Hash passwords, create jwt and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const result = await User.create({ 
      email: email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    })

    const token = jwt.sign(
      { email: result.email, id: result._id, },
      'text',
      {expiresIn: '1h'}
    )
  
    // Return User
    res.status(200).json({result, token})
  } 

  catch (error) {
    return res.status(400).json({"message": error.message})
  }
}
















