import React from "react";
import { Trade } from "../types";
import { format } from "date-fns";


interface Props {
    trades: Trade[];
}

export const RecentTrades: React.FC<Props> = ({ trades }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Trades</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3 px-4">Date</th>
                            <th className="text-left py-3 px-4">Type</th>
                            <th className="text-left py-3 px-4">Asset</th>
                            <th className="text-right py-3 px-4">Amount</th>
                            <th className="text-right py-3 px-4">Price</th>
                            <th className="text-right py-3 px-4">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trades.map((trade) => (
                            <tr key={trade.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">
                                    {format(new Date(trade.date), 'MMM d, yyyy')}
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        trade.type === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {trade.type.toUpperCase()}
                                    </span>
                                </td>
                                <td className="py-3 px-4">{trade.asset}</td>
                                <td className="py-3 px-4 text-right">{trade.amount}</td>
                                <td className="py-3 px-4 text-right">${trade.price.toLocaleString()}</td>
                                <td className="py-3 px-4 text-right">${(trade.amount * trade.price).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};