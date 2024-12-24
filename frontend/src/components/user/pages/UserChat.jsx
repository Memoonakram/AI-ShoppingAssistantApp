import React, { useContext, useEffect, useState } from 'react'
import { ChatRoom } from '../../components/common/ChatRoom';
import { UserContext } from '../UserContext'


export const UserChat = () => {
  let winheight = window.innerHeight - 125;
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const {profile} = useContext(UserContext);

  useEffect(() => {
    // setTimeout(() => {
      // let token = localStorage.getItem('userToken');
      // if (!token) {
      //   window.location.href = '/login';
      // }
      // setToken(token.access);
      // setUsername(profile?.username);
    // }, 1000);
  }, []);

  return (
    <>
      <div className="w-full pt-8">
        <div className="flex items-center justify-between w-full space-x-8 px-4" style={{ height: winheight + 'px' }}>
          {<ChatRoom RecieverUsername={'admin'} senderUsername={'ahsanab22'} /> }
        </div>
      </div>
    </>
  )
}

