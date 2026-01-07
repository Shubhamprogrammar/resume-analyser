const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative bg-white w-[90%] md:w-[70%] max-h-[85vh] overflow-y-auto rounded-xl shadow-xl p-6 z-50">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-3xl cursor-pointer"
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
