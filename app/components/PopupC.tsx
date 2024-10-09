"use client";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PopupC: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-8 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-1 right-2  text-gray-50  text-3xl hover:text-gray-300  "
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupC;
