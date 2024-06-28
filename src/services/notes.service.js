import { where } from 'sequelize';
import sequelize, { DataTypes } from '../config/database';
import HttpStatus from 'http-status-codes';

const Notes = require('../models/notes')(sequelize, DataTypes);

//creating notes

export const createNotes = async (body) => {
    try {
        const data = await Notes.create(body);
        return {
            code: HttpStatus.CREATED,
            data: data,
            message: 'notes created successfully'
        }

    } catch (error) {
        return {
            code: HttpStatus.BAD_REQUEST,
            data:[],
            message: 'notes not created'
        }
    }

}


//getting notes
export const readAllNotes = async (body) => {
    try {
        const data = await Notes.findAll({ where: { userId: body } });
        console.log('-->',data);    
        if (data){
            return {
                code: HttpStatus.OK,
                data:data,
                Message: "notes fetched SuccessFully"
            }
        }else{
            return {
                code: HttpStatus.NOT_FOUND,
                data:[],
                Message: "notes Not Found"
            }
        }
    } catch (error) {
        return {
            code: HttpStatus.BAD_REQUEST,
            data:[],
            message: 'Unable to fetch notes'
        }
    }
    
}

//getting notes by id
export const getNotesById = async (body) =>{
    try {
        if (!body){
            return {
                code: HttpStatus.NOT_FOUND,
                data:[],
                Message: "Please Enter Valid Id"
            }
        }else{
            const Maindata =await Notes.findByPk(body)
            if (!Maindata){
                return {
                    code: HttpStatus.NOT_FOUND,
                    data:[],
                    Message: "notes Not Found"
                }
            }else{
                return {
                    code: HttpStatus.OK,
                    data:Maindata,
                    Message: "notes Fetch Successfully"
                }
            }
            
        }
    } catch (error) {
        
    }
}