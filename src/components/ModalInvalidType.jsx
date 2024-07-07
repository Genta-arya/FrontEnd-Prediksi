import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // FontAwesome close icon

const ModalInvalidType = ({ isVisible, onClose }) => {
  return (
   
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-sm mx-auto p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold text-red-500 mb-4">
          Format File Salah
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Jenis file tidak didukung. Harap unggah file dengan format JPEG, PNG,
          atau GIF.
        </p>
      </div>
    
  );
};

export default ModalInvalidType;
