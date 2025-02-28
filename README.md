# Portfolio Analytics Dashboard

A modern, interactive dashboard for monitoring investment strategies and analyzing market data. Built with React, TypeScript, and Supabase.

## Features

- **Dynamic Performance Charts**: Track portfolio growth and asset allocation over time
- **Key Metrics Display**: Monitor ROI, CAGR, drawdown percentage, and Sharpe ratio
- **Responsive Design**: Fully functional on both desktop and mobile devices
- **Advanced Filtering**: Filter data by date range and customize views
- **Recent Trades**: Track your latest investment activities
- **Secure Data**: Row-level security ensures data privacy

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Database**: Supabase (PostgreSQL)
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- A Supabase account

### Installation

1. Clone the repository:
   git clone <repository-url>
   cd portfolio-analytics-dashboard

2. Install dependencies:
   npm install

3. Set up environment variables:
   - Click the "Connect to Supabase" button in your development environment
   - This will automatically create a `.env` file with your Supabase credentials

4. Start the development server:
   npm run dev

The application will be available at `http://localhost:5173`

### UI/UX Decisions

1. **Layout**
   - Clean, minimalist design focusing on data visualization
   - Responsive grid system for optimal viewing on all devices
   - Consistent spacing and typography using Tailwind CSS

2. **Charts and Visualizations**
   - Line chart for portfolio performance tracking
   - Pie chart for asset allocation visualization
   - Interactive tooltips for detailed data inspection

3. **Color Scheme**
   - Primary: Indigo (#6366f1) for main actions and charts
   - Success: Green for positive metrics
   - Warning: Red for negative metrics
   - Neutral grays for background and text

4. **Performance Considerations**
   - Optimized chart rendering with `ResponsiveContainer`
   - Efficient data formatting with `date-fns`
   - Minimal dependencies to reduce bundle size
