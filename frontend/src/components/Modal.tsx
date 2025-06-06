import React from "react";

interface ModalProps {
  isOpen: boolean; // Modal open state
  title: string; // Modal title
<<<<<<< HEAD
  message: string; // Message displayed in the modal
=======
  message: string; // Message displayed inside the modal
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
  onClose: () => void; // Function to close the modal
  onConfirm: () => void; // Function to confirm the action
}

const Modal: React.FC<ModalProps> = ({
                                       isOpen,
                                       title,
                                       message,
                                       onClose,
                                       onConfirm,
                                     }) => {
  if (!isOpen) {
<<<<<<< HEAD
    return null; // If modal is not open, render nothing
=======
    return null; // Do not render if modal is not open
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
<<<<<<< HEAD
      onClose(); // Close modal if clicking on overlay
=======
      onClose(); // Close modal if clicked on the overlay
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
    }
  };

  return (
      <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
<<<<<<< HEAD
          onClick={handleOverlayClick} // Click handler for overlay
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-semibold font-montserratRegular mb-4 text-center">{title}</h2>{" "}
          {/* Centered title text */}
          <p className="mb-6 text-center">{message}</p>{" "}
          {/* Centered message text */}
          <div className="flex justify-center space-x-4">
            {" "}
            {/* Center-align buttons */}
=======
          onClick={handleOverlayClick} // Handle overlay click
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2> {/* Centered title text */}
          <p className="mb-6 text-center">{message}</p> {/* Centered message text */}
          <div className="flex justify-center space-x-4"> {/* Centered buttons */}
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
            <button
                onClick={onClose}
                className="bg-gray-400 text-white px-4 py-2 rounded-full"
            >
              Cancel
            </button>
            <button
                onClick={onConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded-full"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
  );
};

<<<<<<< HEAD
export default Modal;
=======
export default Modal;
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
