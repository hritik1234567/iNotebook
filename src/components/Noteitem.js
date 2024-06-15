import React,{useContext} from 'react'
import Notes from './Notes';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    
    const context=useContext(noteContext)
    const {deleteNote}=context;
    const { note,updateNote } = props;
    return (
<>


        <div className='col-md-3'>
          <div className="card my-3">
            <div className="card-body">

              <h5 className="card-title">{note.title}</h5>
              {note.tag !== "" && <p>Tag: {note.tag}</p>}
              <p className="card-text">{note.description}</p>
              <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Note Deleted successfully","success");}}></i>
              <i className="fa-regular fa-file-pen mx-1" onClick={()=>{updateNote(note)}}></i>
              
            </div>
          </div>
        </div>
      
</>
)
}

export default Noteitem
