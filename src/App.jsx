import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import InputImage from "./components/InputImage";

import TablesResult from "./components/TablesResult";
import ModalWelcome from "./components/ModalWelcome";

function App() {
  const [result, setResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const resultRef = useRef(null); // Ref untuk TablesResult

  useEffect(() => {
    if (result && result.length > 1 && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <div className="app-background">
          <div className="relative z-10">
            <Navbar />
          </div>
          <motion.div
            className="flex h-screen items-center justify-center  md:p-4 p-2 lg:p-4 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="lg:p-6 w-full md:p-6 lg:max-w-3xl p-2 bg-opacity-75 dark:bg-black z-10 rounded-lg"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <InputImage setResult={setResult} result={result} />
            </motion.div>
          </motion.div>
          <div className="relative z-10">
            {result && result.length > 0 && (
              <TablesResult result={result} ref={resultRef} />
            )}
          </div>
          <AnimatePresence>
            {isModalOpen && (
              <ModalWelcome isOpen={isModalOpen} onClose={closeModal} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
