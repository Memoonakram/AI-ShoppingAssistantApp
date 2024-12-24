import React, { useState, useContext, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AdminContext } from '../AdminContext';

export const FAQsAdmin = () => {
  const { FAQs, createFAQ, updateFAQ, deleteFAQ } = useContext(AdminContext);
  const [faqs, setFaqs] = useState([]);
  const [currentFaq, setCurrentFaq] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const sortedFaqs = [...FAQs].sort((a, b) => a.priority - b.priority);
    setFaqs(sortedFaqs);
  }, [FAQs]);

  const handleCreateClick = () => {
    setCurrentFaq({ question: '', answer: '', priority: 1 });
    setIsEditMode(false); 
    setShowModal(true); 
  };

  const handleEditClick = (faq) => {
    setCurrentFaq(faq);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleSave = () => {
    updateFAQ(currentFaq);
    setShowModal(false);
  };

  const handleCreate = () => {
    createFAQ(currentFaq);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    deleteFAQ(id);
  };

  return (
    <div className="w-full px-[var(--margin-x)] pb-8">
    <div className="py-5 lg:py-6">
    <h2 class="text-base font-medium tracking-wide text-slate-800 line-clamp-1 dark:text-navy-100">Frequently Asked Questions</h2>

      <button onClick={handleCreateClick} class="my-2 btn border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90">
      <i class="fa fa-plus mr-2"></i>
      Create FAQ
      </button>

      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6">
                  {
                  faqs.map(faq => <FaqCard faq={faq} key={faq.id} handleEditClick={handleEditClick} handleDelete={handleDelete}/>)
                  }

        </div>

      {/* FaqModal */}
      <FaqModal
        faq={currentFaq}
        showModal={showModal}
        setShowModal={setShowModal}
        isEditMode={isEditMode}
        handleSave={handleSave}
        handleCreate={handleCreate}
        setCurrentFaq={setCurrentFaq}
      />
    </div>
    </div>
  );
};

const FaqCard = ({ faq, handleEditClick, handleDelete }) => {
  return (
    <div class="card px-4 pb-4 sm:px-5">
            <div class="my-3 flex h-8 items-center justify-between">
              <h2 class="font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100 lg:text-base">
                {faq.priority}. {faq.question}  
              </h2>
              <div className="flex space-x-1">
                    <button onClick={() => handleEditClick(faq)}
                     className="btn h-8 w-8 p-0 text-info hover:bg-info/20 focus:bg-info/20 active:bg-info/25">
                        <i className="fa fa-edit"></i>
                    </button>
                    <button onClick={() => handleDelete(faq.id)}
                     className="btn h-8 w-8 p-0 text-error hover:bg-error/20 focus:bg-error/20 active:bg-error/25">
                        <i className="fa fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            <div>
              <p>
                {faq.answer}
              </p>
            </div>
          </div>
  )
}



const FaqModal = ({ faq, showModal, setShowModal, isEditMode, handleSave, handleCreate, setCurrentFaq }) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentFaq((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
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
              className="relative w-full max-w-lg origin-top rounded-lg bg-white dark:bg-navy-700 transition-all duration-300"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* Modal Header */}
              <div className="flex justify-between rounded-t-lg bg-slate-200 px-4 py-3 dark:bg-navy-800 sm:px-5">
                <h3 className="text-base font-medium text-slate-700 dark:text-navy-100">
                  {isEditMode ? 'Edit FAQ' : 'Create FAQ'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="btn -mr-1.5 size-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-4 py-4 sm:px-5">
                <div className="mt-4 space-y-4">
                  {/* Question Field */}
                  <label className="block">
                    <span>Question:</span>
                    <input
                      type="text"
                      name="question"
                      value={faq.question}
                      onChange={handleInputChange}
                      className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                      placeholder="Enter question"
                    />
                  </label>

                  {/* Answer Field */}
                  <label className="block">
                    <span>Answer:</span>
                    <textarea
                      rows="4"
                      name="answer"
                      value={faq.answer}
                      onChange={handleInputChange}
                      className="form-textarea mt-1.5 w-full resize-none rounded-lg border border-slate-300 bg-transparent p-2.5 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                      placeholder="Enter answer"
                    />
                  </label>

                  {/* Priority Field */}
                  <label className="block">
                    <span>Priority:</span>
                    <input
                      type="number"
                      name="priority"
                      value={faq.priority}
                      onChange={handleInputChange}
                      className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                      placeholder="Priority"
                    />
                  </label>
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
                  onClick={isEditMode ? handleSave : handleCreate}
                  className="btn min-w-[7rem] rounded-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
                >
                  {isEditMode ? 'Save' : 'Create'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};