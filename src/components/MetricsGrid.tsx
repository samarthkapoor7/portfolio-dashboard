import { BarChart2, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import { PerformanceMetrics } from "../types";


interface Props {
    metrics: PerformanceMetrics;
}

export const MetricsGrid: React.FC<Props> = ({ metrics }) => {
    const cards = [
        {
            title: 'ROI',
            value: `${(metrics.roi * 100).toFixed(2)}%`,
            icon: TrendingUp,
            color: metrics.roi >= 0 ? 'text-green-500' : 'text-red-500'
        },
        {
            title: 'CAGR',
            value: `${(metrics.cagr * 100).toFixed(2)}%`,
            icon: BarChart2,
            color: metrics.cagr >= 0 ? 'text-green-500' : 'text-red-500'
        },
        {
            title: 'Max Drawdown',
            value: `${(metrics.maxDrawdown * 100).toFixed(2)}%`,
            icon: TrendingDown,
            color: 'text-red-500'
        },
        {
            title: 'Sharpe Ratio',
            value: metrics.sharpeRatio.toFixed(2),
            icon: TrendingUp,
            color: metrics.sharpeRatio >= 1 ? 'text-green-500' : 'text-yellow-500'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => (
                <div key={card.title} className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-500 text-sm font-medium">{card.title}</h3>
                        <card.icon className={`w-5 h-5 ${card.color}`} />
                    </div>
                    <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                </div>
            ))}
        </div>
    );
};