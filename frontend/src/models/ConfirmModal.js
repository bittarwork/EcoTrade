import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                <h2 className="text-xl mb-4">تأكيد العملية</h2>
                <p>{message}</p>
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
                    >
                        إلغاء
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                    >
                        حذف
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
