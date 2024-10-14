import React from 'react';

const UserInfoModal = ({ user, onClose }) => {
    if (!user) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-sm mx-4">
                <h2 className="text-2xl font-semibold text-center mb-4">معلومات المستخدم</h2>
                <img src={user.profileImage} alt="Profile" className="w-24 h-24 rounded-full border-2 border-gray-300 mx-auto mb-4" />
                <p className="text-gray-700"><strong>الاسم:</strong> {user.name}</p>
                <p className="text-gray-700"><strong>البريد الإلكتروني:</strong> {user.email}</p>
                <p className="text-gray-700"><strong>تاريخ الإنشاء:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-700"><strong>الدور:</strong> {user.role}</p>
                <div className="flex justify-center mt-6">
                    <button
                        onClick={onClose}
                        className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-400 transition duration-300"
                    >
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInfoModal;
