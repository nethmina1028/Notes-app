import React, { useState } from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({userInfo}) =>{
  
  const[searchQuery,setSearchQuery] = useState('');

  const navigate = useNavigate();

   const onLogout = () =>{
    localStorage.clear();
      navigate("/login");
   };

   //
   const handleSearch = () =>{};

    const onClearSearch = () =>{
     setSearchQuery('');
    };

  return (
    <div className="flex items-center justify-between px-6 py-2 bg-white drop-shadow">
        <h2 className='py-2 text-xl font-medium text-black '>Notes</h2>
          
          <SearchBar
          value={searchQuery}
          onChange={({target}) =>{
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
          />

        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar