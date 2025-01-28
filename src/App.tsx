import { Calendar, Filter } from "lucide-react"
import { useState } from "react"
import { MetricsGrid } from "./components/MetricsGrid";
import { AssetAllocation, PerformanceMetrics, PortfolioData } from "./types";
import { PortfolioChart } from "./components/PortfolioChart";
import { createClient } from "@supabase/supabase-js";
import { AssetAllocationChart } from "./components/AssetAllocationChart";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const mockPortfolioData: PortfolioData[] = Array.from({ length: 30 }, (_, i) => ({
  id: `day-${i}`,
  date: new Date(2024, 1, i + 1).toISOString(),
  totalValue: 100000 + Math.random() * 50000,
  dailyPnL: (Math.random() - 0.5) * 5000,
  winRate: 0.6 + Math.random() * 0.2
}));

const mockAssetAllocation: AssetAllocation[] = [
  { id: '1', assetClass: 'Stocks', percentage: 45, value: 45000 },
  { id: '2', assetClass: 'Bonds', percentage: 25, value: 25000 },
  { id: '3', assetClass: 'Crypto', percentage: 15, value: 15000 },
  { id: '4', assetClass: 'Cash', percentage: 10, value: 10000 },
  { id: '5', assetClass: 'Real Estate', percentage: 5, value: 5000 },
];

const mockMetrics: PerformanceMetrics = {
  roi: 0.156,
  cagr: 0.124,
  maxDrawdown: 0.185,
  sharpeRatio: 1.2
};

function App() {
  const [dateRange, setDateRange] = useState('1M');
  const [metrics, setMetrics] = useState<PerformanceMetrics>(mockMetrics);
  const [porfolioData, setPortfolioData] = useState<PortfolioData[]>(mockPortfolioData);
  const [assetAllocation, setAssetAllocation] = useState<AssetAllocation[]>(mockAssetAllocation);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">Portfolio Analytics</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-lg">
                <Calendar className="w-4 h-4 text-gray-500" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="bg-transparent border-none text-sm font-medium focus:outline-none"
                >
                  <option value="1W">1W</option>
                  <option value="1M">1M</option>
                  <option value="3M">3M</option>
                  <option value="1Y">1Y</option>
                  <option value="ALL">All</option>
                </select>
              </div>
              <button className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-lg">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Filter</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <MetricsGrid metrics={metrics} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PortfolioChart data={porfolioData} />
            </div>
            <div>
              <AssetAllocationChart data={assetAllocation} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
