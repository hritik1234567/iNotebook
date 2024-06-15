import React, {useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { type } from '@testing-library/user-event/dist/type';


const Addnote = (props) => {
    const context=useContext(noteContext)
    const {addnote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleclick=(e)=>{
        e.preventDefault();
        addnote(note.title,note.description,note.tag );
        setNote({title:"",description:"",tag:""});
        props.showAlert("Note Added successfully","success");
    }
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
  return (

    <>
    <div className='container-fluid my-3'>
    <h2>Add a Note</h2>
    <form action="">
    <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
  <input type="text" className="form-control" id="title" name='title' placeholder="Enter your title" value={note.title} onChange={onchange} minLength={3}/>
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
  <textarea type="text" className="form-control" id="description" name='description' rows="3"  value={note.description} onChange={onchange} minLength={5}></textarea>
</div> 
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
  <input type="text" className="form-control" id="tag" placeholder="Enter your tag" name='tag'  value={note.tag} onChange={onchange} minLength={0}/>
</div>
    <button disabled={note.title.length<3||note.description.length<5} type='submit' className='btn btn-secondary' onClick={handleclick}>Add Note</button>
    </form>
    </div>
    </>
  )
}

export default Addnote
