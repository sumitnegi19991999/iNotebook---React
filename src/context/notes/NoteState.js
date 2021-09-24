import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "6149e6aafe06dae546e579352",
          "user": "6148cb03f58a9efc1ff3fe5c",
          "title": "wakeup updated",
          "description": "early in 5 AM updated",
          "tag": "personal",
          "date": "2021-09-21T14:05:30.820Z",
          "__v": 0
        },
        {
          "_id": "6149e6abfe06d6ae56e579354",
          "user": "6148cb03f58a9efc1ff3fe5c",
          "title": "wakeup",
          "description": "early in 5 AM",
          "tag": "personal",
          "date": "2021-09-21T14:05:31.553Z",
          "__v": 0
        },
        {
          "_id": "614a1b994edf37b9c52e5f9f8",
          "user": "6148cb03f58a9efc1ff3fe5c",
          "title": "wakeup",
          "description": "early in 5 AM",
          "tag": "personal",
          "date": "2021-09-21T17:51:21.371Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)


      //add note
      const addNote = (title,description,tag) =>{
        const note={
          "_id": "614a1b994edf37bd9c52e5f9f8",
          "user": "6148cb03f58a9efc1ff3fe5c",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2021-09-21T17:51:21.371Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }
    

      //delete note
      const deleteNote = (id) =>{
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
      }



        //edit note

        const editNote = (id,title,description,tag) =>{
          for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element.id===id){
              element.title=title;
              element.description=description;
              element.tag=tag;

      }

          }
        }


     
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;