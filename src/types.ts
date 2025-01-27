export interface PortfolioData {
    id: string;
    date: string;
    totalValue: number;
    dailyPnL: number;
    winRate: number;
  }
  
  export interface AssetAllocation {
    id: string;
    assetClass: string;
    percentage: number;
    value: number;
  }
  
  export interface Trade {
    id: string;
    date: string;
    type: 'buy' | 'sell';
    asset: string;
    amount: number;
    price: number;
  }
  
  export interface PerformanceMetrics {
    roi: number;
    cagr: number;
    maxDrawdown: number;
    sharpeRatio: number;
  }