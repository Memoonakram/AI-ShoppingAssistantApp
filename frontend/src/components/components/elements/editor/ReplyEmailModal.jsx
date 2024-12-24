import React, { useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'; 
import Editor from './EditorWithQuillJS'
import { SwalAlert } from '../SwalAlert';
import { APP_NAME } from '../../../../data/Variables';
import { AdminContext } from '../../../admin/AdminContext';



export const ReplyEmailModal = ({contact, setContact, showModal, setShowModal, isStockReply}) => {
    const { replyContact, stockReply} = useContext(AdminContext);

    const [subject, setSubject] = useState(`Re: ${APP_NAME}`)

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        if (name === 'subject') {
          setSubject(value);
          return;
        }
        setContact({ ...contact, [name]: value });
        console.log(contact);
      }

      const handleReply = (replyhtml) => {
        setContact({ ...contact, reply: replyhtml });
        console.log(contact);
      }

      const handleSend = () => {
        if (!contact.email || !subject || !contact.reply) {
            SwalAlert("Error", "Please fill all fields", 2000, "error", false);
          return;
        }
        const data = {
          id: contact.id,
          email: contact.email,
          subject: subject,
          reply_message: contact.reply
        }
        let res;
        if (!isStockReply) {
          res = replyContact(data);
        } else {
          res = stockReply(data);
        }
        if (res) {
          setShowModal(false);
      }
    }
      return (
        <div>
          {/* {isLoading && <LoadingScreen />} */}
          <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
              role="dialog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Background overlay */}
              <motion.div
                className="absolute inset-0 bg-slate-900/60 transition-opacity duration-300"
                onClick={() => setShowModal(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              ></motion.div>
  
              {/* Modal content */}
              <motion.div
                className="relative w-full max-w-5xl max-h-xl origin-top rounded-lg bg-white dark:bg-navy-700 transition-all duration-300"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                {/* Modal Header */}
                <div className="flex justify-between rounded-t-lg bg-slate-200 px-4 py-3 dark:bg-navy-800 sm:px-5">
                  <h3 className="text-base font-medium text-slate-700 dark:text-navy-100">
                    Reply Email - {contact.name}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn w-7 h-7 -mr-1.5 size-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                  >X
                  </button>
                </div>
  
                {/* Modal Body */}
                <div className="px-4 py-4 space-y-4">
                <div className='space-y-4'>
                    <label class="block">
                      <span>Email</span>
                      <span class="relative mt-1.5 flex">
                        <input
                          class="form-input peer w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                          value={contact.email}
                          onChange={handleContactChange}
                          name="email"
                          type="text"
                        />
                        <span class="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                          <i class="fa-regular fa-user text-base"></i>
                        </span>
                      </span>
                    </label>
                    <label class="block">
                      <span>Subject</span>
                      <span class="relative mt-1.5 flex">
                        <input
                          class="form-input peer w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                          placeholder="Your First Name"
                          name="subject"
                          value={subject}
                          onChange={handleContactChange}
                          type="text"
                        />
                        <span class="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                          <i class="fa-regular fa-user text-base"></i>
                        </span>
                      </span>
                    </label>
                </div>
                <div className='overflow-auto max-h-80'>
                <Editor message={contact.message} handleReply={handleReply} />
                </div>
                </div>
  
                {/* Modal Footer */}
                <div className="flex justify-end space-x-2 px-4 py-3 bg-slate-200 dark:bg-navy-700 rounded-b-lg">
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn min-w-[7rem] rounded-full border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSend}
                    className="btn min-w-[7rem] rounded-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
                  >
                    Send
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      );
    };