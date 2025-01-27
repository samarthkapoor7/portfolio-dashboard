/*
  # Portfolio Analytics Schema

  1. New Tables
    - `portfolio_data`
      - Daily portfolio performance tracking
      - Includes total value, P&L, and win rate
    - `asset_allocation`
      - Current asset allocation breakdown
      - Tracks percentage and value by asset class
    - `trades`
      - Record of all trading activity
      - Includes trade type, asset, amount, and price
    - `performance_metrics`
      - Key performance indicators
      - Stores ROI, CAGR, drawdown, etc.

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated users to access their own data
*/

-- Portfolio Data Table
CREATE TABLE IF NOT EXISTS portfolio_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  date timestamptz NOT NULL,
  total_value numeric NOT NULL,
  daily_pnl numeric NOT NULL,
  win_rate numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT positive_total_value CHECK (total_value >= 0),
  CONSTRAINT valid_win_rate CHECK (win_rate >= 0 AND win_rate <= 1)
);

ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own portfolio data"
  ON portfolio_data
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Asset Allocation Table
CREATE TABLE IF NOT EXISTS asset_allocation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  asset_class text NOT NULL,
  percentage numeric NOT NULL,
  value numeric NOT NULL,
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_percentage CHECK (percentage >= 0 AND percentage <= 100),
  CONSTRAINT positive_value CHECK (value >= 0)
);

ALTER TABLE asset_allocation ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own asset allocation"
  ON asset_allocation
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Trades Table
CREATE TABLE IF NOT EXISTS trades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  date timestamptz NOT NULL,
  type text NOT NULL,
  asset text NOT NULL,
  amount numeric NOT NULL,
  price numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_trade_type CHECK (type IN ('buy', 'sell')),
  CONSTRAINT positive_amount CHECK (amount > 0),
  CONSTRAINT positive_price CHECK (price > 0)
);

ALTER TABLE trades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own trades"
  ON trades
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Performance Metrics Table
CREATE TABLE IF NOT EXISTS performance_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  roi numeric NOT NULL,
  cagr numeric NOT NULL,
  max_drawdown numeric NOT NULL,
  sharpe_ratio numeric NOT NULL,
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_drawdown CHECK (max_drawdown >= 0)
);

ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own performance metrics"
  ON performance_metrics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_portfolio_data_user_date 
  ON portfolio_data(user_id, date);

CREATE INDEX IF NOT EXISTS idx_trades_user_date 
  ON trades(user_id, date);

CREATE INDEX IF NOT EXISTS idx_asset_allocation_user 
  ON asset_allocation(user_id);

CREATE INDEX IF NOT EXISTS idx_performance_metrics_user 
  ON performance_metrics(user_id);