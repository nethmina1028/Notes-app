import React, {useEffect,useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import {MdAdd} from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import {  useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import axiosInstance from '../../utils/axioslnstance'
import Toast from '../../components/ToastMessage/Toast'



function Home() {

    const [openAddEditModal,setOpenAddEditModal] =useState({
      isShown:false,
      type:'add',
      data:null,
    });

    const [showToastMsg,setShowToastMsg] = useState({
      isShown:false,
      message:'',
      type:'add',
    });
    
    const [allNotes,setAllNotes] = useState([]);
    const [userInfo,setUserInfo] = useState(null);
    
    const navigate = useNavigate();
    
           //Edit
        const handleEdit = (noteDetails) =>{
          setOpenAddEditModal({ isShown:true,data:noteDetails,type:'edit'});
        };

       const showToastMessage = (message,type) =>{
          setShowToastMsg({
            isShown:true,
            message,
            type,
          });
        };


        const handleCloseToast = () =>{
          setShowToastMsg({
            isShown:false,
            message:'',
          });
        };
        
      //Get user Info

      const getUserInfo = async () => {
        try{
          const response = await axiosInstance.get("/get-user");
          if(response.data && response.data.user){
            setUserInfo(response.data.user);
          }
          }catch(error){
            if( error.response.status === 401){
            
           }
            localStorage.clear();
            navigate("/login");
        }
        
      };

       //Get all notes

       const getAllNotes = async () => {
        try{
          const response = await axiosInstance.get("/get-all-notes");
          if(response.data && response.data.notes){
            setAllNotes(response.data.notes);
          }
          }catch(error){
           console.log("An Expected error occured");
            
           }
           
        };
        
      

      useEffect(() => {
        getUserInfo();
        getAllNotes();
        return () => {};
      }, []);

  return (
    <>
     <Navbar userInfo={userInfo} />
        
        <div className='container mx-auto'>
          <div className='grid grid-cols-3 gap-4 mt-8'>

            {allNotes.map((item,index) => (
               <NoteCard
                key={item._id}
               title={item.title}
               date={item.createdOn} // npm i moment
               content={item.content}
               tags={item.tags}
               isPinned={item.isPinned}
               onEdit={() => handleEdit(item)}
               onDelete={() =>{}}
               onPinNote={() =>{}}
            />
             )) }
           
           {/* <NoteCard
          <NoteCard
               title="Meeting on 7th April"
               date="April 7 2021"
               content="Meeting on 7th April Meeting on 7th April "
               tags="#Meeting"
               isPinned={true}
               onEdit={() =>{}}
               onDelete={() =>{}}
               onPinNote={() =>{}}
            />

            */}
            
           </div>

        </div>

        <button className='absolute flex items-center justify-center w-16 h-16 rounded-2xl bg-primary hover:bg-blue-600 right-10 bottom-10'
         onClick={() =>{
            setOpenAddEditModal({
              isShown:true,
              type:'add',
              data:null,
            });

         }}>
          <MdAdd className='text-[32px] text-white' />
        </button>
   
        <Modal 
    isOpen={openAddEditModal.isShown}
    onRequestClose={() =>{}}
    style={{
      overlay:{
        backgroundColor:'rgba(0,0,0,0.2)',
      },
      
    }}
    className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll "
    contentLabel=""
    
    >

      <AddEditNotes
        type={openAddEditModal.type}
        noteData={openAddEditModal.data}
        onClose={()=>{
        setOpenAddEditModal({
          isShown:false,
          type:'add',
          data:null,
        });
       }}
         getAllNotes={getAllNotes}
         showToastMessage={showToastMessage}

      />
      </Modal>
      
      <Toast
         isShown={showToastMsg.isShown}
          message={showToastMsg.message}
          type={showToastMsg.type}
          onClose={handleCloseToast}
      />
      
    </>
  )
}

export default Home