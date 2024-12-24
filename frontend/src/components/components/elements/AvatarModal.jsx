// src/components/AvatarModal.js
import React, { useEffect, useState } from "react";
import { avatars } from "../../../static/images/avater/avatar";
import { ButtonElement } from "./FormElements";
import { Modal } from "./Modal";


export const AvatarModal = ({ isOpen, onClose, onSave, gender='O' }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleSaveClick = () => {
    if (selectedAvatar) {
      onSave(selectedAvatar);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} isClose={onClose} onSave={handleSaveClick} title="Select Avatar">
          <div className="grid grid-cols-4 gap-4">
          {Object.values(avatars[gender]).map((avatar, index) => (
              <img
                key={index}
                src={avatar.src}
                alt={`avatar-${index}`}
                className={`cursor-pointer h-32 w-32 rounded ${
                  selectedAvatar === avatar ? "border-4 border-indigo-500" : ""
                }`}
                onClick={() => handleAvatarClick(avatar)}
              />
            ))}
          </div>
          </Modal>
  );
};

