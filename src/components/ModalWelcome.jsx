import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import img from "../assets/image/icon.png";

const ModalWelcome = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md p-4">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-lg w-full relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="flex items-center space-x-3 mb-4 mt-4">
          <img src={img} className="w-14" alt="Icon" />
          <h2 className="md:text-2xl text-base lg:text-2xl font-semibold text-gray-800 dark:text-gray-100 max-w-80">
            Website Pengukuran Luas Daun Selada
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-justify text-sm md:text-base lg:text-base">
          Webiste ini dirancang untuk mengukur luas daun dengan efisien dan
          mudah. Web ini menggunakan machine learning untuk mengetahui ukuran
          luas daun secara akurat.
        </p>
      </motion.div>
    </div>
  );
};

export default ModalWelcome;
