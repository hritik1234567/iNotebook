import NoteContext from "./noteContext";
import { useState } from "react";

const Notestate = (props) => {
    // Correct usage of useState
    const host = "http://localhost:8000";
    const notesinitial = [];

    const [notes, setNotes] = useState(notesinitial);
    // Providing state and update function in the context value
    const getNotes = async (title, description, tag) => {
        //api call from here 
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },

        })
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }
    /*const getNotes = async () => {
        try {
          const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NTg4M2M5OWQ4MDBiYzY0NjA5NjQ2NzkifX0sImlhdCI6MTcwMzY5Mjc3MX0.zqzf5Ox48MypvvPzXHh-jM2i3vPybh1kUa2ZUDyaccg', 
            },
          });
      
          if (!response.ok) {
            throw new Error(`Failed to fetch notes. Status: ${response.status}`);
          }
      
          const json = await response.json();
          console.log('Fetched notes:', json);
          setNotes(json);
        } catch (error) {
          console.error('Error fetching notes:', error.message);
        }
      };   
        */


    const addnote = async (title, description, tag) => {
        
            // API call to add a note
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });

            // Check if the request was successful (status code 2xx)
           
                // Parse the JSON response
                const newNote = await response.json();

                // Assuming the server sends back the newly created note
                console.log("Newly added note:", newNote);

                // Update the notes state with the new note
                setNotes(notes.concat(newNote));
           
    }

    //Adding a note
    /*const addnote=async(title,description,tag)=>{
    //api call from here 
    const response=await fetch(`${host}/api/notes/addnote`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NTg4M2M5OWQ4MDBiYzY0NjA5NjQ2NzkifX0sImlhdCI6MTcwMzY5Mjc3MX0.zqzf5Ox48MypvvPzXHh-jM2i3vPybh1kUa2ZUDyaccg"
        },
        body:JSON.stringify({title,description,tag})
    }) 
    
    
    
    //notes setting 
       const note= {
        "_id": "",
        "user": "65883c99d800bc6460964679",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-12-25T08:31:18.182Z",
        "__v": 0
      };
    
     setNotes(notes.concat(note));
    }*/

    //Deleting a note
    const deleteNote = async (id) => {

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },

        })
        const json = await response.json();
        console.log(json);
        //Above api call is done
        console.log("Note is deleted with the id" + id);

        const newNotes = notes.filter((note) => { return note._id !== id });

        setNotes(newNotes);


    }


    //Updating a note
    const editNote = async (id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json();
        console.log(json);
        let newNotes = JSON.parse(JSON.stringify(notes));
        console.log(notes);
        //Editing notes
        for (let index = 0; index < newNotes.length; index++) {

            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        console.log(newNotes);
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addnote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default Notestate;
