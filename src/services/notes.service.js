import { where } from 'sequelize';
import sequelize, { DataTypes } from '../config/database';
import HttpStatus from 'http-status-codes';
// import { updateNote } from '../controllers/notes.controller';

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
            data: [],
            message: 'notes not created'
        }
    }

}

//getting notes
export const readAllNotes = async (body) => {
    try {
        const data = await Notes.findAll({ where: { userId: body } });
        console.log('-->', data);
        if (data) {
            return {
                code: HttpStatus.OK,
                data: data,
                Message: "notes fetched SuccessFully"
            }
        } else {
            return {
                code: HttpStatus.NOT_FOUND,
                data: [],
                Message: "notes Not Found"
            }
        }
    } catch (error) {
        return {
            code: HttpStatus.BAD_REQUEST,
            data: [],
            message: 'Unable to fetch notes'
        }
    }

}

//getting notes by id
export const getNotesById = async (body) => {
    try {
        if (!body) {
            return {
                code: HttpStatus.NOT_FOUND,
                data: [],
                Message: "Please Enter Valid Id"
            }
        } else {
            const Maindata = await Notes.findByPk(body)
            if (!Maindata) {
                return {
                    code: HttpStatus.NOT_FOUND,
                    data: [],
                    Message: "notes Not Found"
                }
            } else {
                return {
                    code: HttpStatus.OK,
                    data: Maindata,
                    Message: "notes Fetch Successfully"
                }
            }

        }
    } catch (error) {
        return {
            code: HttpStatus.BAD_REQUEST,
            data: [],
            message: 'Unable to fetch notes'
        }
    }
}

//update notes
export const updateNote = async (updatedNotes, ID) => {
    try {
        if (!updatedNotes || !ID) {
            return {
                code: HttpStatus.NOT_FOUND,
                data: [],
                message: "Please Provide Valid Id"
            }
        } else {
            await Notes.update(updatedNotes, { where: { id: ID } })
            const data = await Notes.findByPk(ID)

            return {
                code: HttpStatus.OK,
                data: data,
                message: "note Updated Successfully"
            }
        }
    } catch (error) {
        return {
            code: HttpStatus.BAD_REQUEST,
            data: [],
            message: 'Unable to update notes'
        }
    }
}

//delete notes
export const deleteNotes = async (ID) => {
    try {
        if (!ID) {
            return {
                code: HttpStatus.NOT_FOUND,
                data: [],
                message: "Please Provide Id"
            }
        } else {
            const data = Notes.findByPk(ID);
            if (!data) {
                return {
                    code: HttpStatus.NOT_FOUND,
                    data: [],
                    message: "Please Provide Valid Id"
                }
            } else {
                Notes.destroy({ where: { id: ID } })
                return {
                    code: HttpStatus.OK,
                    data: [],
                    message: "Deleted The Note"
                }
            }
        }
    } catch (error) {
        return {
            code: HttpStatus.BAD_REQUEST,
            data: [],
            message: 'Unable to delete notes'
        }
    }
}

