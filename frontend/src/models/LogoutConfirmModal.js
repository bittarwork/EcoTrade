import React from 'react';

const LogoutConfirmModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4">تأكيد تسجيل الخروج</h2>
                <p>هل أنت متأكد أنك تريد تسجيل الخروج؟</p>
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">
                        إلغاء
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition">
                        تسجيل الخروج
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutConfirmModal;
