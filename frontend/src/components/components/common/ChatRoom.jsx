import React, { useState, useEffect, useRef, useContext } from 'react';
import { avatars2 } from '../../../static/images/avater/avatar';

const roomName = 'admin_ahsan';

export const ChatRoom = ({RecieverUsername, senderUsername}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);
  const winHeight = window.innerHeight - 125;

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const token = userToken ? userToken.access : null;
    console.log(token);

    if (!token) {
      console.error('No token found, unable to open WebSocket connection.');
      return;
    }

    const websocketURL = `ws://localhost:8000/ws/chat/${roomName}/?token=${token}`;
    ws.current = new WebSocket(websocketURL);

    // Handling incoming messages
    ws.current.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      console.log('Message received:', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
    };

    // WebSocket connection error handler
    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // WebSocket connection close handler
    ws.current.onclose = () => {
      console.log('WebSocket closed.');
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []); // Empty dependency array to ensure this runs once when component mounts

  // useEffect(() => {
  //     setProfileD(profile)
  // }, [profile])

  const sendMessage = () => {
    if (input.trim() && ws.current && ws.current.readyState === WebSocket.OPEN) {
      const messageData = {
        message: input,
        receiver_name: RecieverUsername,
        sender_name: senderUsername,
      };

      // Send message through WebSocket
      ws.current.send(JSON.stringify(messageData));
      setInput(''); // Clear the input field after sending the message
    } else {
      console.warn('WebSocket is not open or input is empty.');
    }
  };

  return (
    <div
      className="flex border-indigo-500 box-shadow-lg w-full ml-2 rounded-2xl card"
      style={{ height: winHeight + 'px' }}
    >
      {/* Chat Header */}
      <div className="relative z-10 flex h-[61px] w-full shrink-0 items-center justify-between border-b border-slate-150 bg-white px-4 shadow-sm transition-[padding,width] duration-[.25s] dark:border-navy-700 dark:bg-navy-800 rounded-t-2xl">
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-4 font-inter">
            <div className="avatar">
              <img
                className="rounded-full"
                src={avatars2['m1']}
                alt="avatar"
              />
            </div>
            <div>
              <p className="font-medium text-slate-700 line-clamp-1 dark:text-navy-100">
              
                {RecieverUsername.charAt(0).toUpperCase() + RecieverUsername.slice(1)}
              </p>
              <p className="mt-0.5 text-xs">{RecieverUsername}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="grow overflow-y-auto px-[calc(var(--margin-x)-.5rem)] py-5 transition-all duration-[.25s] scrollbar-sm">

      {messages.map((message, index) => (
  <div 
    key={index} 
    className={`flex items-start my-2 p-2 border-b border-slate-200 dark:border-navy-600 ${message.sender_name === RecieverUsername ? 'justify-end' : ''}`}
  >
    <div className="flex flex-col items-start space-y-3.5">
      <div className="mr-4 max-w-lg sm:mr-10">
        <div className="rounded-2xl rounded-tl-none bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100">
          <p className="text-slate-700 dark:text-navy-100">
            {message.message}
          </p>
        </div>
      </div>
    </div>
  </div>
))}
      </div>

      {/* Chat Input */}
      <div className="relative flex h-12 w-full shrink-0 items-center justify-between border-t border-slate-150 bg-white px-4 transition-[padding,width] duration-[.25s] dark:border-navy-600 dark:bg-navy-800 rounded-b-2xl">
        <div className="-ml-1.5 flex flex-1 space-x-2">
          <input
            type="text"
            className="form-input h-9 w-full bg-transparent placeholder:text-slate-400/70"
            placeholder="Write the message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="-mr-1.5 flex">
          <button
            className="btn h-9 w-9 shrink-0 rounded-full p-0 text-slate-500 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:text-navy-200 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
            onClick={() => console.log('Emoji button clicked')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5.5 w-5.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button
            className="btn h-9 w-9 shrink-0 rounded-full p-0 text-primary hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:text-accent-light dark:hover:bg-accent-light/20 dark:focus:bg-accent-light/20 dark:active:bg-accent-light/25"
            onClick={sendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5.5 w-5.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.813 5.146 9.027 3.99c4.05 1.79 4.05 4.718 0 6.508l-9.027 3.99c-6.074 2.686-8.553.485-5.515-4.876l.917-1.613c.232-.41.232-1.09 0-1.5l-.917-1.623C1.26 4.66 3.749 2.46 9.813 5.146ZM6.094 12.389h7.341"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
