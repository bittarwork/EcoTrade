import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

// تسجيل العناصر اللازمة
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);

const AuctionStatistics = ({ auctions }) => {
    const totalAuctions = auctions.length;

    // إذا كانت المصفوفة فارغة، عرض رسالة بديلة
    if (totalAuctions === 0) {
        return (
            <div className="p-5 mb-10 bg-white rounded-lg" dir='rtl'>
                <h2 className="text-2xl font-bold mb-4">إحصائيات المزادات</h2>
                <p className="text-lg">لا توجد مزادات متاحة حالياً.</p>
            </div>
        );
    }

    const openAuctions = auctions.filter(auction => auction.status === 'open').length;
    const closedAuctions = totalAuctions - openAuctions;
    const totalStartPrice = auctions.reduce((total, auction) => total + auction.startPrice, 0);
    const averageStartPrice = (totalStartPrice / totalAuctions).toFixed(2);
    const highestStartPrice = Math.max(...auctions.map(auction => auction.startPrice), 0);
    const lowestStartPrice = Math.min(...auctions.map(auction => auction.startPrice), Infinity);

    // المزادات التي ستنتهي خلال 24 ساعة
    const auctionsEndingSoon = auctions.filter(auction =>
        new Date(auction.endDate) - new Date() < 86400000 && auction.status === 'open'
    ).length;

    // بيانات الرسم البياني للأعمدة
    const barChartData = {
        labels: ['مفتوح', 'مغلق'],
        datasets: [
            {
                label: 'عدد المزادات',
                data: [openAuctions, closedAuctions],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            },
        ],
    };

    // بيانات الرسم البياني الخطي
    const lineChartData = {
        labels: ['أعلى سعر', 'متوسط السعر', 'أدنى سعر'],
        datasets: [
            {
                label: 'الأسعار',
                data: [highestStartPrice, averageStartPrice, lowestStartPrice],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div className="" dir='rtl'>
            <h2 className="text-2xl font-bold mb-4">إحصائيات المزادات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-100 p-4 rounded-lg">
                    <p className="text-lg">إجمالي المزادات: <span className="font-semibold">{totalAuctions}</span></p>
                    <p className="text-lg">المزادات المفتوحة: <span className="font-semibold">{openAuctions}</span></p>
                    <p className="text-lg">المزادات المغلقة: <span className="font-semibold">{closedAuctions}</span></p>
                    <p className="text-lg">عدد المزادات التي ستنتهي خلال 24 ساعة: <span className="font-semibold">{auctionsEndingSoon}</span></p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg">
                    <p className="text-lg">متوسط السعر الابتدائي: <span className="font-semibold">{averageStartPrice} ليرة سورية</span></p>
                    <p className="text-lg">أعلى سعر ابتدائي: <span className="font-semibold">{highestStartPrice} ليرة سورية</span></p>
                    <p className="text-lg">أدنى سعر ابتدائي: <span className="font-semibold">{lowestStartPrice} ليرة سورية</span></p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <h3 className="text-xl font-semibold">رسم بياني لعدد المزادات:</h3>
                    <div className="h-64">
                        <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">رسم بياني للأسعار:</h3>
                    <div className="h-64">
                        <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuctionStatistics;
