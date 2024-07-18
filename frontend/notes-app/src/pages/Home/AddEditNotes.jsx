import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axioslnstance';

const AddEditNotes =({noteData,type,onClose,getAllNotes})=> {
          
      const[title,setTitle]=useState(noteData?.title ||"");
      const[content,setContent]=useState(noteData?.content ||"");
      const[tags,setTags]=useState(noteData?.tags ||[]);


   const[error,setError]=useState(null);

      //Add Note
      const addNewNote = async () =>{
        try{
          const response = await axiosInstance.post("/add-note",{
            title,
            content,
            tags,
          });
          
          if(response.data && response.data.note){
            getAllNotes()
            onClose()
          }
        }catch(error){
          if(
            error.response &&
            error.response.data &&
            error.response.data.message
          ){
            setError(error.response.data.message);
          }
        }
      };

      //Edit Note
      const editNote = async () =>{
        const noteId = noteData._id;
        try{
          const response = await axiosInstance.put("/edit-note/" + noteId,{
            title,
            content,
            tags,
          });
          
          if(response.data && response.data.note){
            getAllNotes()
            onClose()
          }
        }catch(error){
          if(
            error.response &&
            error.response.data &&
            error.response.data.message
          ){
            setError(error.response.data.message);
          }
        }
      };


    const handleAddNote = () =>{
          
        if(!title){
            setError('Title is required');
            return;
        }

        if(!content){
            setError('Content is required');
            return;
        }

        setError("");

        if(type ==='edit'){
          editNote();
        }else{
          addNewNote();
        
        }

        };

    

  return (

    <div>
      <div className='relative'>
        <button className='absolute flex items-center justify-center w-10 h-10 rounded-full -top-3 -right-3 hover:bg-slate-100 ' onClick={onClose}>
          <MdClose className='text-3xl text-slate-400'/>

        </button>
      </div>
        <div className='flex flex-col gap-2'>
            <label className='input-label'>TITLE</label>
            <input
              type='text'
              className='text-2xl outline-none text-slate-950 '
              placeholder='Go To GYM At 5'
              value={title}
              onChange={({target}) => setTitle(target.value)}
            />

        </div>

        <div className='flex flex-col gap-2 mt-4'>
            <label className='input-label'>CONTENT</label>
             <textarea
             type='text'
             className='p-2 text-sm rounded outline-none text-slate-950 bg-slate-50 '
             placeholder='Content'
             rows={10}
             value={content}
              onChange={({target}) => setContent(target.value)}
             />

        </div>

        <div className='mt-3'>
            <label className='input-label'>TAGS</label>
            <TagInput tags={tags} setTags={setTags} />
        </div>
                       
                         
        {error && <p className='pt-4 text-xs text-red-500'>{error}</p>}

        <button className='p-3 mt-5 font-medium btn-primary 'onClick={handleAddNote}>
            {type ==='edit' ? 'UPDATE' : 'ADD NOTE'}
        </button>
    </div>
  );
};

export default AddEditNotes;