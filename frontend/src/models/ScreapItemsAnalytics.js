import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const ScreapItemsAnalytics = ({ scrapItems }) => {
    const categories = ['Metals', 'Plastics', 'Electronics', 'Paper and Cardboard', 'Furniture'];
    const statuses = ['Received', 'Processed', 'Ready for Recycling', 'Ready for Auction'];
    const sources = ['User Request', 'Admin Manual Entry'];

    // حساب المتوسطات
    const averageEstimatedPrice = scrapItems.reduce((acc, item) => acc + item.estimatedPrice, 0) / scrapItems.length || 0;
    const averageQuantity = scrapItems.reduce((acc, item) => acc + item.quantity, 0) / scrapItems.length || 0;

    // إعداد البيانات للفئات
    const categoryDistribution = categories.map(category => {
        return scrapItems.filter(item => item.category === category).length;
    });

    // إعداد البيانات للحالة
    const statusDistribution = statuses.map(status => {
        return scrapItems.filter(item => item.status === status).length;
    });

    // إعداد البيانات للمصدر
    const sourceDistribution = sources.map(source => {
        return scrapItems.filter(item => item.source === source).length;
    });

    return (
        <div className="p-6 bg-gray-100 min-h-screen">


            <div className="flex flex-col md:flex-row justify-around mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-2xl font-semibold mb-2">المتوسطات</h3>
                    <div className="text-xl">
                        <p>متوسط السعر التقديري: <span className="font-bold">{averageEstimatedPrice.toLocaleString()} ل.س</span></p>
                        <p>متوسط الكميات: <span className="font-bold">{averageQuantity.toFixed(2)} طن</span></p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">التوزيع حسب الفئات</h3>
                    <Bar
                        data={{
                            labels: categories,
                            datasets: [
                                {
                                    label: 'عدد العناصر',
                                    data: categoryDistribution,
                                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                },
                            ],
                        }}
                        options={{ responsive: true }}
                    />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">التوزيع حسب الحالة</h3>
                    <Bar
                        data={{
                            labels: statuses,
                            datasets: [
                                {
                                    label: 'عدد العناصر',
                                    data: statusDistribution,
                                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                                },
                            ],
                        }}
                        options={{ responsive: true }}
                    />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">التوزيع حسب المصدر</h3>
                    <Pie
                        data={{
                            labels: sources,
                            datasets: [
                                {
                                    label: 'عدد العناصر',
                                    data: sourceDistribution,
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.6)',
                                        'rgba(54, 162, 235, 0.6)',
                                    ],
                                },
                            ],
                        }}
                        options={{ responsive: true }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ScreapItemsAnalytics;
