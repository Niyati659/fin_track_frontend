'use client'

import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertTriangle, TrendingUp, Shield, ArrowUp, ArrowDown } from 'lucide-react'
import { Speedometer } from '@/components/speedometer'

// Mock data for trust score trends
const trustScoreTrendData = [
  { month: 'Jan', score: 650 },
  { month: 'Feb', score: 665 },
  { month: 'Mar', score: 680 },
  { month: 'Apr', score: 695 },
  { month: 'May', score: 710 },
  { month: 'Jun', score: 720 },
]

// Mock fraud alerts
const fraudAlerts = [
  { id: 1, transaction: 'Online Purchase - Electronics', amount: '$2,450', severity: 'High', date: '2 hours ago' },
  { id: 2, transaction: 'International Transfer - Singapore', amount: '$5,000', severity: 'Medium', date: '1 day ago' },
  { id: 3, transaction: 'ATM Withdrawal - Unknown Location', amount: '$1,200', severity: 'High', date: '2 days ago' },
  { id: 4, transaction: 'Multiple Failed Login Attempts', amount: 'N/A', severity: 'Low', date: '3 days ago' },
]

export default function TxnTrustDashboard() {
  const [currentScore, setCurrentScore] = useState(720)
  const [expenseReduction, setExpenseReduction] = useState(0)
  const [incomeIncrease, setIncomeIncrease] = useState(0)
  const [emiClosed, setEmiClosed] = useState(0)

  // Calculate projected score based on simulations
  const projectedScore = useMemo(() => {
    let score = 720
    score += expenseReduction * 0.5 // Reducing expenses improves score
    score += incomeIncrease * 0.3 // Increasing income improves score
    score += emiClosed * 20 // Closing EMI significantly improves score
    return Math.min(Math.max(score, 300), 850) // Clamp between 300-850
  }, [expenseReduction, incomeIncrease, emiClosed])

  const getRiskLevel = (score: number) => {
    if (score >= 700) return { level: 'Low', color: 'bg-green-500/20 text-green-600' }
    if (score >= 600) return { level: 'Medium', color: 'bg-yellow-500/20 text-yellow-600' }
    return { level: 'High', color: 'bg-red-500/20 text-red-600' }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-red-500/10 text-red-600 border-red-200'
      case 'Medium':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-200'
      case 'Low':
        return 'bg-blue-500/10 text-blue-600 border-blue-200'
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-200'
    }
  }

  const riskLevel = getRiskLevel(currentScore)

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">TxnTrust Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Your financial health at a glance</p>
          </div>
        </div>

        {/* Trust Score Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
          <div className="flex items-center justify-between gap-8">
            <div className="flex flex-col items-center gap-4">
              <Speedometer score={currentScore} />
              <div className="text-center">
                <p className="text-sm font-medium text-white/70">Current Score</p>
                <p className="mt-1 text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{currentScore}</p>
                <p className="text-xs text-white/70 mt-2">{riskLevel.level} Risk</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white/70">Your Financial Health Score</p>
              <div className="mt-4 space-y-4">
                <div className="rounded-lg bg-white/5 p-4 border border-white/5">
                  <p className="text-xs font-medium text-white/50 uppercase tracking-wide mb-2">Score Breakdown</p>
                  <div className="space-y-2 text-sm text-white/70">
                    <div className="flex items-center justify-between">
                      <span>Income Stability:</span>
                      <span className="font-semibold text-green-400">Strong</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Expense Management:</span>
                      <span className="font-semibold text-blue-400">Moderate</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Savings Pattern:</span>
                      <span className="font-semibold text-purple-400">Good</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>EMI Burden:</span>
                      <span className="font-semibold text-orange-400">High</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Fraud Risk:</span>
                      <span className="font-semibold text-green-400">Low</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-white/5 p-4 border border-white/5">
                  <p className="text-xs font-medium text-white/50 uppercase tracking-wide mb-2">Recommendations</p>
                  <ul className="space-y-2 text-xs text-white/70">
                    <li className="flex gap-2">
                      <ArrowUp className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Increase income to boost your score</span>
                    </li>
                    <li className="flex gap-2">
                      <ArrowDown className="h-3 w-3 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span>Work on reducing EMI obligations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Health Breakdown */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-foreground">Transaction Health</h2>
          <div className="grid gap-4 md:grid-cols-5">
            {[
              { label: 'Income Stability', value: 85, color: 'from-green-500 to-emerald-600' },
              { label: 'Expense Ratio', value: 72, color: 'from-blue-500 to-cyan-600' },
              { label: 'Savings Consistency', value: 68, color: 'from-purple-500 to-pink-600' },
              { label: 'EMI Burden', value: 45, color: 'from-orange-500 to-red-600' },
              { label: 'Fraud Risk', value: 12, color: 'from-red-500 to-pink-600' },
            ].map((card) => (
              <div key={card.label} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg">
                <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                <div className="mt-4 space-y-3">
                  <div className="text-3xl font-bold text-foreground">{card.value}%</div>
                  <div className="h-2 overflow-hidden rounded-full bg-border">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${card.color} transition-all duration-300`}
                      style={{ width: `${card.value}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Trust Score Trend Chart */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-6 text-xl font-bold text-foreground">6-Month Trust Score Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trustScoreTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" domain={[300, 850]} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Simulation Panel */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-6 text-xl font-bold text-foreground">Score Simulator</h2>
            <div className="space-y-6">
              {/* Projected Score */}
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-sm font-medium text-muted-foreground">Projected Score</p>
                <p className="mt-2 text-3xl font-bold text-blue-500">{Math.round(projectedScore)}</p>
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Reduce Expenses</label>
                    <span className="text-sm text-blue-500">{expenseReduction}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={expenseReduction}
                    onChange={(e) => setExpenseReduction(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer rounded-lg bg-border accent-blue-500"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Increase Income</label>
                    <span className="text-sm text-green-500">{incomeIncrease}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={incomeIncrease}
                    onChange={(e) => setIncomeIncrease(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer rounded-lg bg-border accent-green-500"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Close EMI</label>
                    <span className="text-sm text-purple-500">{emiClosed}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={emiClosed}
                    onChange={(e) => setEmiClosed(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer rounded-lg bg-border accent-purple-500"
                  />
                </div>
              </div>

              <button className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition-all hover:bg-blue-700">
                Apply Changes
              </button>
            </div>
          </div>
        </div>

        {/* Fraud Alerts */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-6 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-bold text-foreground">Fraud Alerts</h2>
          </div>
          <div className="space-y-3">
            {fraudAlerts.map((alert) => (
              <div key={alert.id} className={`rounded-xl border-2 p-4 transition-all ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold">{alert.transaction}</p>
                    <p className="mt-1 text-sm opacity-75">{alert.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{alert.amount}</p>
                    <span className="mt-1 inline-block rounded-full bg-current bg-opacity-20 px-3 py-1 text-xs font-semibold">
                      {alert.severity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
