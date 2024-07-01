import HttpStatus from 'http-status-codes';
import * as notesService from '../services/notes.service';


export const createNotes = async (req , res) =>{
    // console.log(req.body);
    const data = await notesService.createNotes(req.body);
    res.status(data.code).json(data);
}

export const readAllNotes = async (req , res )=>{
    const data = await notesService.readAllNotes(req.body.userId);
    res.status(data.code).json(data);
}

export const getNotesById = async (req, res) =>{
    const data = await notesService.getNotesById(req.body.userId, req.params.id);
    res.status(data.code).json(data);
}

export const updateNote = async (req, res) =>{
    const data = await notesService.updateNote(req.body.userId, req.body, req.params.id);
    res.status(data.code).json(data);
}

export const deleteNotes = async (req, res) =>{
    const data = await notesService.deleteNotes(req.body.userId, req.params.id);
    res.status(data.code).json(data);
}

export const changeColor = async (req, res) => {
    const data = await notesService.changeColor(req.body.userId, req.body, req.params.id);
    res.status(data.code).json(data);
}