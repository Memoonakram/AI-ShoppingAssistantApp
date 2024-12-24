import React, { useState, useContext, useEffect } from 'react';
import {ReplyEmailModal} from '../../components/elements/editor/ReplyEmailModal';
import { AdminContext } from '../AdminContext';

export const AdminContact = () => {

    const [showModal, setShowModal] = useState(false);
    const { contacts } = useContext(AdminContext);

  const [contactRecords, setContactRecords] = useState([]);
  const [replycontact, setReplyContact] = useState({});

  useEffect(() => {
    setContactRecords(contacts.sort((a, b) => b.id - a.id));
  }, [contacts]);

  const handleReply = (contact) => {
    setReplyContact(contact);
    setShowModal(true);
  }

  return (
    <>
    <div className="w-full px-[var(--margin-x)] pb-8">
      <div className="py-5 lg:py-6">
        <h2 class="text-base font-medium tracking-wide text-slate-800 line-clamp-1 dark:text-navy-100">Contact Forms</h2>
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6">
          {
            contactRecords.map(contact => <ContactCard contact={contact} key={contact.id} handleReply={handleReply} setShowModal={setShowModal} />)
          }
        </div>

      </div>
      <ReplyEmailModal
        showModal={showModal}
        setShowModal={setShowModal}
        contact={replycontact}
        setContact={setReplyContact}
      />
    </div>
    </>
  )
}

const ContactCard = ({ contact, handleReply }) => {
    return (
      <div class="card px-4 pb-4 sm:px-5">
        <div class="my-3 flex h-8 items-center justify-between">
          <h2 class="font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100 lg:text-base">
            {contact.name} - {contact.email}
          </h2>
          <div className="flex space-x-1">
            {
              contact.status === 'Replied'?
              <span class="my-2 btn cursor-default border border-slate-300 font-medium text-success">
                <i class="fa fa-reply mr-2"></i>
                Replied
              </span>:
            
            <button onClick={() => handleReply(contact)}
              class="my-2 btn border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90">
              <i class="fa fa-reply mr-2"></i>
              Reply
            </button>
            }
          </div>
        </div>
        <div>
          <p>
            {contact.message}
          </p>
        </div>
      </div>
    )
  }
