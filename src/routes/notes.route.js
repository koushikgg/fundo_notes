import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

// to create new notes
router.post('',userAuth, notesController.createNotes);
router.get('',userAuth, notesController.readAllNotes);


export default router;

