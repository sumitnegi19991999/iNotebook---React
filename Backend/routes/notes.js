const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require("express-validator");

//ROUTE 1 get all the notes using: GET "/api/notes/createuser". NO login required
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        
   const note = await Note.find({user: req.user.id});
    res.json(note)
   
    }catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
      }
}
)
//ROUTE 2 adding a new note using: POST "/api/notes/addnote". NO login required
router.post('/addnote', fetchuser,[
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "enter a valid description").isLength({ min: 5 }),
  ],async(req,res)=>{
    const {title, description, tag} = req.body;
// if there are error return bad request and the errors
try {
    
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
const note = new Note({
    title, description, tag, user: req.user.id
})
const savedNote = await note.save()
    res.json(savedNote)
 }
 catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
  })

  //ROUTE 3 updating an existing note using: PUT "/api/notes/updatenote". NO login required
  router.put('/updatenote/:id', fetchuser,async(req,res)=>{
    const {title, description, tag} = req.body;
    // Create a newNote object
    try {
    const newNote = {};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("not found")}

    if(note.user.toString() !== req.user.id){
      return res.status(401).send("not allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true})
    res.json({note});
 
} catch (error) {
  console.error(error.message);
  res.status(500).send("some error occured");
}
}) 
  //ROUTE 4 deleting an existing note using: delete "/api/notes/deletenote". NO login required
  router.delete('/deletenote/:id', fetchuser,async(req,res)=>{
    const {title, description, tag} = req.body;
try {
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("not found")}

    if(note.user.toString() !== req.user.id){
      return res.status(401).send("not allowed");
    }
    note = await Note.findOneAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted",note: note});
  
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
})
module.exports = router;