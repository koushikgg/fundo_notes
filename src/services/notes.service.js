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
        // console.log('-->', data);
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
export const getNotesById = async (userID, ID) => {
    try {
        if (!ID) {
            return {
                code: HttpStatus.NOT_FOUND,
                data: [],
                Message: "Please Enter Valid Id"
            }
        } else {
            const Maindata = await Notes.findAll({ where: { id: ID, userId: userID } })
            if (Maindata.length === 0) {
                return {
                    code: HttpStatus.UNAUTHORIZED,
                    data: [],
                    Message: "invalid user"
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
export const updateNote = async (userID, updatedNotes, ID) => {
    try {
        if (!updatedNotes || !ID) {
            return {
                code: HttpStatus.NOT_FOUND,
                data: [],
                message: "Please Provide Valid Id"
            }
        } else {
            const userData =await Notes.findByPk(ID)
            if (userID != userData.userId) {
                return {
                    code: HttpStatus.UNAUTHORIZED,
                    data: [],
                    Message: "invalid user"
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
export const deleteNotes = async (userID, ID) => {
    try {
        if (!ID) {
            return {
                code: HttpStatus.NOT_FOUND,
                data: [],
                message: "Please Provide Id"
            }
        } else {
            const userData =await Notes.findByPk(ID)
            if (!userData) {
                return {
                    code: HttpStatus.NOT_FOUND,
                    data: [],
                    message: "Please Provide Valid Id"
                }
            }
            if (userID != userData.userId) {
                return {
                    code: HttpStatus.UNAUTHORIZED,
                    data: [],
                    Message: "invalid user"
                }
            } else {
                await Notes.destroy({ where: { id: ID } })
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

//change color
export const changeColor = async (userID, color, ID) => {
    try {
        if (!color || !ID) {
            return {
                code: HttpStatus.NOT_FOUND,
                data: [],
                message: "Please Provide colour and ID"
            }
        } else {
            const userData =await Notes.findByPk(ID)
            if (!userData) {
                return {
                    code: HttpStatus.NOT_FOUND,
                    data: [],
                    message: "Please Provide Valid Id"
                }
            }
            if (userID != userData.userId) {
                return {
                    code: HttpStatus.UNAUTHORIZED,
                    data: [],
                    Message: "invalid user"
                }
            } else {
                await Notes.update(color, { where: { id: ID } })
                return {
                    code: HttpStatus.OK,
                    data: [],
                    message: "colour Changed Successfully"
                }
            }
        }
    } catch (error) {
        return {
            code: HttpStatus.BAD_REQUEST,
            data: [],
            message: 'Unable to change the colour'
        }
    }
}