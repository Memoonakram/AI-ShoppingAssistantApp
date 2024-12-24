import React, { useContext, useEffect, useState } from 'react'
import { ChatRow } from '../components/ChatRow';
import { ChatRoom } from '../../components/common/ChatRoom';
import { AuthContext } from '../../services/AuthService';

export const AdminChat = () => {
    let winheight = window.innerHeight - 125;

    const [token, setToken] = useState('');
      const [username, setUsername] = useState('');
      const {user} = useContext(AuthContext);
    
      useEffect(() => {
        // let token = localStorage.getItem('userToken');
        // if (!token) {
        //   window.location.href = '/login';
        // }
        // setToken(token.access);
        // setUsername(user.username);
      }, [user]);

  return (
    <>
      <div className="w-full pt-8">
        <div className="flex items-center justify-between w-full space-x-8 px-4" style={{ height: winheight + 'px' }}>
          <div className="w-3/12 flex flex-col h-full box-shadow-lg rounded-2xl card">
            <div className='w-full px-2 py-3'>
              <div className="px-4">
                {/* <label className="relative hidden sm:flex bg-indigo-500 rounded-full">
                  <input className="form-input peer h-9 w-full rounded-full border border-slate-300 px-3 py-2 pl-9 text-xs+ placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent bg-lightmode dark:bg-darkmode" placeholder="Search users..." type="text"
                  // value={searchText}
                  // onChange={hendleSearchText}
                  />
                  <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3.316 13.781l.73-.171-.73.171zm0-5.457l.73.171-.73-.171zm15.473 0l.73-.171-.73.171zm0 5.457l.73.171-.73-.171zm-5.008 5.008l-.171-.73.171.73zm-5.457 0l-.171.73.171-.73zm0-15.473l-.171-.73.171.73zm5.457 0l.171-.73-.171.73zM20.47 21.53a.75.75 0 101.06-1.06l-1.06 1.06zM4.046 13.61a11.198 11.198 0 010-5.115l-1.46-.342a12.698 12.698 0 000 5.8l1.46-.343zm14.013-5.115a11.196 11.196 0 010 5.115l1.46.342a12.698 12.698 0 000-5.8l-1.46.343zm-4.45 9.564a11.196 11.196 0 01-5.114 0l-.342 1.46c1.907.448 3.892.448 5.8 0l-.343-1.46zM8.496 4.046a11.198 11.198 0 015.115 0l.342-1.46a12.698 12.698 0 00-5.8 0l.343 1.46zm0 14.013a5.97 5.97 0 01-4.45-4.45l-1.46.343a7.47 7.47 0 005.568 5.568l.342-1.46zm5.457 1.46a7.47 7.47 0 005.568-5.567l-1.46-.342a5.97 5.97 0 01-4.45 4.45l.342 1.46zM13.61 4.046a5.97 5.97 0 014.45 4.45l1.46-.343a7.47 7.47 0 00-5.568-5.567l-.342 1.46zm-5.457-1.46a7.47 7.47 0 00-5.567 5.567l1.46.342a5.97 5.97 0 014.45-4.45l-.343-1.46zm8.652 15.28l3.665 3.664 1.06-1.06-3.665-3.665-1.06 1.06z"></path>
                    </svg>
                  </span>
                  <button className="btn h-8 w-10 rounded-full p-0 mr-2 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                    // onClick={handleSearchUsers}
                    type='submit'
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" stroke="white" fill="none" viewBox="0 0 24 24">
                      <circle cx="10.2" cy="10.2" r="7.2" strokeWidth="1.5"></circle>
                      <path strokeWidth="1.5" strokeLinecap="round" d="M21 21l-3.6-3.6"></path>
                    </svg>
                  </button>
                </label> */}
              </div>
              <div className='my-2 overflow-y-auto pb-2' style={{ height: winheight - 60 + 'px' }}>
                <ChatRow />
                <ChatRow />
                <ChatRow />
                <ChatRow />
                <ChatRow />
              </div>
            </div>
          </div>

          {<ChatRoom RecieverUsername={'ahsanab22'} senderUsername={'admin'}/>}

        </div>
      </div>
    </>
  )
}
