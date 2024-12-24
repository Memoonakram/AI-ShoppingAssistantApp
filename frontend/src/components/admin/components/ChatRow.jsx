import React from 'react'
import { avatars2} from '../../../static/images/avater/avatar'


export const ChatRow = () => {
  return (
    <div className="flex cursor-pointer items-center space-x-2.5 px-4 py-2.5 font-inter hover:bg-slate-150 dark:hover:bg-navy-600"
    // @click="$dispatch('change-active-chat',{chatId:'chat-2',avatar_url:'images/avatar/avatar-20.jpg',name:'Konnor Guzman'})"
    >
                  <div className="avatar h-10 w-10">
                    <img className="rounded-full"
                     src={avatars2['m1']}
                     alt="avatar"/>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-baseline justify-between space-x-1.5">
                      <p className="text-xs+ font-medium text-slate-700 line-clamp-1 dark:text-navy-100">
                        Konnor Guzman
                      </p>
                      <span className="text-tiny+ text-slate-400 dark:text-navy-300">09:16</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between space-x-1">
                      <p className="text-xs+ text-slate-400 line-clamp-1 dark:text-navy-300">
                        💣 Adipisicing elit. Prov ident?
                      </p>
                      <div className="flex h-4.5 min-w-[1.125rem] items-center justify-center rounded-full bg-slate-200 px-1.5 text-tiny+ font-medium leading-none text-slate-800 dark:bg-navy-450 dark:text-white">
                        5
                      </div>
                    </div>
                  </div>
                </div>
  )
}

