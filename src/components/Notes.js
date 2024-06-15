import React, {useContext, useEffect,useRef,useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  let navigate=useNavigate();
    const context=useContext(noteContext)
const {notes,getNotes,editNote}=context;

useEffect(()=>{
  if(localStorage.getItem('token')){
    getNotes();
  }
  else{
    navigate('/login');
  }
    
     // eslint-disable-next-line
},[])
const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
const ref=useRef(null);
const refclose=useRef(null);
const updateNote=(currentNote)=>{
ref.current.click();
setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
console.log(currentNote);
}
const handleClick=(e)=>{
   
    e.preventDefault();
    console.log("print toh ho kuch");
 editNote(note.id,note.etitle,note.edescription,note.etag);
 setNote({ id: "", etitle: "", edescription: "", etag: "" })
 props.showAlert("Note Updated successfully","success");

}
const onchange=(e)=>{
    console.log("update button clicked");
    setNote({...note,[e.target.name]:e.target.value});
}
  return (
    <>
    <Addnote showAlert={props.showAlert}/>
   
<button type="button" style={{display:"none"}} className="btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog ">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Rewrite your memories</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleClick}>
      <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
  <input type="text" className="form-control" id="etitle" name='etitle' placeholder="Enter your title" value={note.etitle} onChange={onchange}/>
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
  <textarea type="text" className="form-control" id="edescription" name='edescription' rows="3" onChange={onchange} value={note.edescription} ></textarea>
</div> 
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label"  >Tag</label>
  <input type="text" className="form-control" id="etag"  name='etag' onChange={onchange} value={note.etag}/>
</div>
<div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length < 3 || note.edescription.length < 5} className="btn btn-primary" type="submit" data-bs-dismiss="modal">Update Note</button>
      </div>
</form>
    </div>
      </div>
    
    </div>
  </div>



     <div className='row'>

      <h3>Your notes</h3>
    {notes.map((note)=>{
        return <Noteitem key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote}/>;
    })}
    </div>
    
    </>
  )
}

export default Notes;
