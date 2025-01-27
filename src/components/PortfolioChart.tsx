import React from "react";
import { PortfolioData } from "../types";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format } from "date-fns";

interface Props {
    data: PortfolioData[];
}

export const PortfolioChart: React.FC<Props> = ({ data }) => {
    return (
        <div className="h-[400px] w-full bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Portfolio Performance</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date"
                      tickFormatter={(date) => format(new Date(date), 'MMM d')}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                      labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
                    />
                    <Line 
                      type="monotone"
                      dataKey="totalValue"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};