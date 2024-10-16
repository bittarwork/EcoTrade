// src/pages/AuctionRoom.js
import React from 'react';
import { useParams } from 'react-router-dom';

const AuctionRoom = () => {
    const { auctionId } = useParams(); // استرجاع معرف المزاد من الرابط

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">غرفة المزاد - {auctionId}</h1>
            {/* هنا يمكنك إضافة محتوى غرفة المزاد الخاصة بالمستخدم */}
            <p>هذه هي غرفة المزاد الخاصة بمزاد ID: {auctionId}</p>
            {/* أضف محتوى غرفة المزاد هنا */}
        </div>
    );
};

export default AuctionRoom;
