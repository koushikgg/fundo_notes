import sequelize, { DataTypes } from '../config/database';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
// import dontenv from 'dotenv';
// dontenv.config();
// const screteKey = process.env.SECRET_KEY;

const User = require('../models/user')(sequelize, DataTypes);

//get all users
export const getAllUsers = async () => {
  const data = await User.findAll();
  return data;
};

// //create new user
// export const signup = async (body) => {
//   try {
//     const data = await User.create(body);

//     return {
//       code: HttpStatus.CREATED,
//       data: data,
//       message: 'User created successfully'
//     };

//   } catch (error) {
//     return {
//       code: HttpStatus.BAD_REQUEST,
//       data: data,
//       message: 'unsuccessfully'
//     };

//   }

// };

//login user
// export const signin = async (body) => {
//   try {
//     if (!body.email || !body.password){
//       return {
//         code: HttpStatus.BAD_REQUEST,
//         data: [],
//         message:"Email and password required"
//       }
//     }
    
//     const user = await User.findOne({where: {email:body.email}})

//     if (!user){
//       return {
//         code: HttpStatus.UNAUTHORIZED,
//         data: [],
//         message:"Invalid Email"
//       }
//     }

//     if (user.password!== body.password){
//       return {
//         code: HttpStatus.UNAUTHORIZED,
//         data: [],
//         message:"Invalid Password"
//       }
//     }

//     const token = jwt.sign({userId : user.id, userEmail: user.email},screteKey)
//     return {
//       code: HttpStatus.OK,
//       data: {token},
//       message:"Login Successful"
//     }

//   } catch (error) {
//     return {
//       code: HttpStatus.BAD_REQUEST,
//       data: data,
//       message: 'unsuccessfully'
//     };

//   }

// };

//update single user
export const updateUser = async (id, body) => {
  await User.update(body, {
    where: { id: id }
  });
  return body;
};

//delete single user
export const deleteUser = async (id) => {
  await User.destroy({ where: { id: id } });
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findByPk(id);
  return data;
};
