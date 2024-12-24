import React, { useState, useEffect } from 'react'
import { Pagination } from '@mui/material';
import { UserTable } from './UserTable';
import { UserCards } from './UserCard';
import { EditUserModal } from './EditUserModal';



function sliceArray(array, page, perPage) {
    if (!Array.isArray(array)) {
      return [];
    }
    
    return array.slice((page - 1) * perPage, page * perPage);
}


export const Users = ({allUsers}) => {
    const [view, setView] = useState('table');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    
    useEffect(() => {
      if (allUsers) {
        setUsers(allUsers);
        setFilteredUsers(allUsers);
        setTotalUsers(allUsers.length);
      }
        console.log('allUsers', allUsers);
    }
    , [allUsers]);



  return (
    <div className="w-full px-[var(--margin-x)] pb-8">
      <div className="flex items-center justify-between py-5 lg:py-6">
        <div className="flex items-center space-x-1">
          <div className="flex">
            {/* <CustomSelect handlefilteredUsers={handlefilteredUsers}/>  */}
          </div>
        </div>
        <div className="flex items-center space-x-2">
        <div className="flex space-x-2">
          <div className="justify-center whitespace-nowrap mr-3">
            {/* <span className='font-bold'>Showing Users : </span>{totalUsers} */}
            </div>
          </div>
          
            <form onSubmit={(e) => e.preventDefault()}
            className="flex items-center space-x-2">
          <label className="relative hidden sm:flex bg-indigo-500 rounded-full">
            <input className="form-input peer h-9 w-full rounded-full border border-slate-300 px-3 py-2 pl-9 text-xs+ placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent bg-lightmode dark:bg-darkmode" placeholder="Search username" type="text"
            //   value={search}
            //   onChange={() => setSearch(e.target.value)}
            name='search'
            />
            <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.316 13.781l.73-.171-.73.171zm0-5.457l.73.171-.73-.171zm15.473 0l.73-.171-.73.171zm0 5.457l.73.171-.73-.171zm-5.008 5.008l-.171-.73.171.73zm-5.457 0l-.171.73.171-.73zm0-15.473l-.171-.73.171.73zm5.457 0l.171-.73-.171.73zM20.47 21.53a.75.75 0 101.06-1.06l-1.06 1.06zM4.046 13.61a11.198 11.198 0 010-5.115l-1.46-.342a12.698 12.698 0 000 5.8l1.46-.343zm14.013-5.115a11.196 11.196 0 010 5.115l1.46.342a12.698 12.698 0 000-5.8l-1.46.343zm-4.45 9.564a11.196 11.196 0 01-5.114 0l-.342 1.46c1.907.448 3.892.448 5.8 0l-.343-1.46zM8.496 4.046a11.198 11.198 0 015.115 0l.342-1.46a12.698 12.698 0 00-5.8 0l.343 1.46zm0 14.013a5.97 5.97 0 01-4.45-4.45l-1.46.343a7.47 7.47 0 005.568 5.568l.342-1.46zm5.457 1.46a7.47 7.47 0 005.568-5.567l-1.46-.342a5.97 5.97 0 01-4.45 4.45l.342 1.46zM13.61 4.046a5.97 5.97 0 014.45 4.45l1.46-.343a7.47 7.47 0 00-5.568-5.567l-.342 1.46zm-5.457-1.46a7.47 7.47 0 00-5.567 5.567l1.46.342a5.97 5.97 0 014.45-4.45l-.343-1.46zm8.652 15.28l3.665 3.664 1.06-1.06-3.665-3.665-1.06 1.06z"></path>
              </svg>
            </span>

            <button className="btn h-8 w-10 rounded-full p-0 mr-2 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
            //   onClick={handleSearchUsers}
              type='submit'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" stroke="white" fill="none" viewBox="0 0 24 24">
                <circle cx="10.2" cy="10.2" r="7.2" strokeWidth="1.5"></circle>
                <path strokeWidth="1.5" strokeLinecap="round" d="M21 21l-3.6-3.6"></path>
              </svg>
            </button>

          </label>
        </form>
          <div className="tabs-list flex p-1  rounded-lg bg-slate-200 dark:bg-navy-800">
            <button
              // className="activeTab === 'tabAll' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100'"
              className={"btn shrink-0 px-3 py-1 text-xs+ font-medium" + (view === 'table' ? ' bg-white shadow dark:bg-navy-500 dark:text-navy-100' : ' hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100')}
              onClick={() => setView('table')}
            >
              Table
            </button>
            <button
              // className="activeTab === 'tabAll' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100'"
              className={"btn shrink-0 px-3 py-1 text-xs+ font-medium" + (view === 'cards' ? ' bg-white shadow dark:bg-navy-500 dark:text-navy-100' : ' hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100')}
              onClick={() => setView('cards')}
            >
              Cards
            </button>
          </div>

        </div>
      </div>


      {/* {filteredUsers[(page-1)*usersPerPage:page*usersPerPage]}
       */}
      <div>
        {view === 'table' ? <UserTable users={sliceArray(filteredUsers, page, perPage)}  showModal={showModal} setShowModal={setShowModal} setModalData={setModalData}/> : <UserCards users={sliceArray(filteredUsers, page, perPage)} showModal={showModal} setShowModal={setShowModal} setModalData={setModalData}/>}
      </div>
      <div className="flex justify-end mt-5">
        <div className="flex space-x-2">
          <div className="flex flex-col justify-center">Users Per Page</div>
          <label className="block">
            <select
              value={perPage}
            //   onChange={handleChangeUsersPerPage}
              className="form-select mt-1 h-8 w-full pr-8 rounded-lg border border-slate-300 bg-white px-2.5 text-xs+ hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:bg-navy-700 dark:hover:border-navy-400 dark:focus:border-accent"
            >
              <option value={20}>20</option>
              <option value={40}>40</option>
              <option value={60}>60</option>
              <option value={80}>80</option>
              <option value={100}>100</option>
            </select>
          </label>
        </div>
        <div className='pagination dark:pagination'>
        <Pagination
          count={Math.ceil(filteredUsers.length / perPage)}    
          page={page}
        //   onChange={handleChangePage}
          // color="primary"
        />
        <EditUserModal isOpen={showModal} onClose={() => {setShowModal(false)}} modalData={modalData} />
        </div>
      </div>
    </div>
  )
}
