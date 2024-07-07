import React, { useRef, useState } from "react";
import LottieAnimation from "./LottieAnimation";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faRedo, faUpload } from "@fortawesome/free-solid-svg-icons";
import { UploadImage } from "../service/API/UploadImage";
import { PulseLoader } from "react-spinners";
import ModalInvalidType from "./ModalInvalidType";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Footer from "./Footer";

const InputImage = ({ setResult, result }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      const validFiles = selectedFiles.filter((file) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        return allowedTypes.includes(file.type);
      });

      if (validFiles.length !== selectedFiles.length) {
        setIsModalVisible(true);
      }

      setFiles(validFiles);
      setError("");
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      const validFiles = droppedFiles.filter((file) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        return allowedTypes.includes(file.type);
      });

      if (validFiles.length !== droppedFiles.length) {
        setIsModalVisible(true);
      }

      setFiles(validFiles);
      setError("");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnCloseInvalidTypeModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setError("File tidak boleh kosong.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      const response = await UploadImage(formData);
      setResult(response.data);
      toast.success("Result Berhasil dibuat");
    } catch (error) {
      console.error("Error uploading the files:", error);
      setError("Terjadi kesalahan saat mengunggah file.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setError("");
    setResult([]); // Reset hasil
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input file value
    }
  };

  return (
    <div
      ref={dropZoneRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="flex flex-col items-center  dark:text-white bg-[#092306] w-full   border-gray-300 lg:p-12 p-6 rounded-lg"
    >
      <div className="  border-2 border-dashed border-gray-400 w-full h-auto lg:p-8 p-8">
        {files.length !== 0 && (
          <div className="flex  self-start lg:mb-12 md:mb-8 mb-4">
            <button
              type="button"
              title="Ganti File"
              onClick={handleFileInputClick}
              className=" text-white hover:text-slate-200 mb-4 "
            >
              <div className="bg-gray-500 flex items-center gap-4  px-4  py-1  rounded-md text-xs lg:text-base md:text-base">
                <FontAwesomeIcon icon={faPencil} className="" />
                <p>Ganti File</p>
              </div>
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full  space-y-4">
          <div className="flex flex-col items-center">
            {files.length > 0 ? (
              <div className="grid grid-cols-3 lg:grid-cols-8 md:grid-cols-4 items-center  gap-4  h-[200px] lg:h-[350px] overflow-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className=" flex flex-col items-center"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="w-20 h-20 rounded-lg mb-4 "
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div
                onClick={handleFileInputClick}
                className="cursor-pointer flex flex-col items-center"
              >
                <LottieAnimation />
              </div>
            )}
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
            accept="image/jpeg, image/png, image/gif"
            multiple
          />
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex flex-col gap-2 mt-4 border-t p-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full  transition-all ease-in disabled:bg-gray-500 bg-green-700 text-white  py-1  rounded-lg hover:bg-green-800 "
            >
              <div className="flex items-center gap-2 justify-center text-xs lg:text-lg  font-bold md:text-base ">
                {!loading && (
                  <FontAwesomeIcon
                    icon={faUpload}
                    className=" rounded-full py-2 px-2"
                  />
                )}
                <p>
                  {loading ? <PulseLoader color="white" size={10} /> : "Upload"}
                </p>
              </div>
            </button>
            {!loading && (
              <>
                {files.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="  transition-all ease-in border-white border hover:text-slate-300 w-full text-white rounded-lg py-1 "
                    >
                      <div className="flex items-center gap-2 justify-center text-xs lg:text-lg md:text-base font-bold ">
                        <FontAwesomeIcon
                          icon={faRedo}
                          className=" rounded-full py-2 px-2"
                        />
                        <p className="">Reset</p>
                      </div>
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </form>
      </div>

      <AnimatePresence>
        {isModalVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 -top-4 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
          >
            <ModalInvalidType
              isVisible={isModalVisible}
              onClose={handleOnCloseInvalidTypeModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default InputImage;
