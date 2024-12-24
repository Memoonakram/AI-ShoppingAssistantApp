import {React, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';

const Editor = ({message, handleReply}) => {
  const { quill, quillRef, Quill } = useQuill({
    modules: {
      blotFormatter: {},
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // Formatting buttons
        [{ color: [] }, { background: [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        // [{ 'script': 'sub'}, { 'script': 'super' }], // Sub/super script
        [{ 'indent': '-1'}, { 'indent': '+1' }], // Indent
        [{ 'align': [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['link'], // Removed 'video', 'image'
      ],
    }
  });

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        // console.log('Text change!');
        // console.log(quill.getText()); // Get text only
        // console.log(quill.getContents()); // Get delta contents
        console.log(quill.root.innerHTML); // Get innerHTML using quill
        handleReply(quill.root.innerHTML);
        // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill]);

  

  useEffect(() => {
    // reply message style 
    // .reply-message-email {
    //   background-color: #e6f7ff; /* Light blue background */
    //   border: 1px solid #91d5ff; /* Light blue border */
    //   padding: 10px;
    //   border-radius: 8px;
    //   margin-bottom: 15px;
    //   color: #333;
    //   font-size: 14px;
    // }
    if (quill && message) {
      const pretextHTML = `
        <p style='background-color: #e6f7ff; border: 1px solid #91d5ff; padding: 10px; border-radius: 8px; margin-bottom: 15px; color: #333; font-size: 14px;'>
          ${message}
        </p>
      `;
      // quill.clipboard.dangerouslyPasteHTML(`<p>Here's a response to your message:</p>`);
      // quill.root.innerHTML = quill.root.innerHTML + pretextHTML;
      quill.root.innerHTML = '';
      quill.root.innerHTML = pretextHTML;
      //remove the first p element from the quill editor
      quill.root.firstChild.remove();
    }
  }, [quill, message]);

  if (Quill && !quill) {
    Quill.register('modules/blotFormatter', BlotFormatter);
  }

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
