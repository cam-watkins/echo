'use client'

import { useState } from "react"
import Sidebar from "@/components/ui/sidebar"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { Button } from "@/components/ui/button"

const retentionData = [
  { time: "0:00", percent: 100 },
  { time: "0:05", percent: 54 },
  { time: "0:15", percent: 48 },
  { time: "0:30", percent: 42 },
  { time: "0:45", percent: 35 },
  { time: "1:00", percent: 30 },
  { time: "1:15", percent: 25 },
  { time: "1:30", percent: 20 },
]

const dummyViewers = Array.from({ length: 13 }, (_, i) => ({
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  watchPercent: Math.floor(Math.random() * 100),
  clickedCTA: Math.random() > 0.5,
}))

export default function CampaignAnalyticsPage() {
  const [page, setPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(dummyViewers.length / itemsPerPage)

  const currentPageViewers = dummyViewers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const totalWatch = dummyViewers.reduce((sum, v) => sum + v.watchPercent, 0)
  const avgWatch = Math.round(totalWatch / dummyViewers.length)
  const ctaClicks = dummyViewers.filter((v) => v.clickedCTA).length

  const campaignConfig = {
    name: "AI Outreach Launch",
    description: "Targeting companies hiring ML engineers",
    csv: "contacts_ai_launch.csv",
    landingPage: "Modern White",
    emailTemplate: "Professional",
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-white p-8 text-black overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Graph */}
          <div>
            <h1 className="text-xl font-semibold mb-2">Watch Time Retention</h1>
            <div className="border border-gray-200 rounded-md bg-gray-50 p-4">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={retentionData}>
                  <defs>
                    <linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00CFE8" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#00CFE8" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Area
                    type="monotone"
                    dataKey="percent"
                    stroke="#00CFE8"
                    fillOpacity={1}
                    fill="url(#colorView)"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-500 mt-1">Viewer drop-off over time</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="border rounded-md p-4 bg-white shadow-sm text-center">
              <p className="text-sm text-gray-500">Avg Watch Time</p>
              <p className="text-xl font-bold text-black">{avgWatch}%</p>
            </div>
            <div className="border rounded-md p-4 bg-white shadow-sm text-center">
              <p className="text-sm text-gray-500">Emails Opened</p>
              <p className="text-xl font-bold text-black">8.7%</p>
            </div>
            <div className="border rounded-md p-4 bg-white shadow-sm text-center">
              <p className="text-sm text-gray-500">Total Views</p>
              <p className="text-xl font-bold text-black">{dummyViewers.length}</p>
            </div>
            <div className="border rounded-md p-4 bg-white shadow-sm text-center">
              <p className="text-sm text-gray-500">CTA Clicks</p>
              <p className="text-xl font-bold text-black">{ctaClicks}</p>
            </div>
          </div>

          {/* Viewer Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Who Watched</h2>
              <Button className="bg-gray-100 text-gray-800 hover:bg-gray-200" size="sm">Export CSV</Button>
            </div>
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="min-w-full text-sm text-black">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium">Name</th>
                    <th className="px-4 py-2 text-left font-medium">Email</th>
                    <th className="px-4 py-2 text-left font-medium">Watch %</th>
                    <th className="px-4 py-2 text-left font-medium">CTA Clicked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {currentPageViewers.map((viewer, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{viewer.name}</td>
                      <td className="px-4 py-2">{viewer.email}</td>
                      <td className="px-4 py-2">{viewer.watchPercent}%</td>
                      <td className="px-4 py-2">
                        {viewer.clickedCTA ? (
                          <span className="text-green-600 font-medium">✔</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-100 text-gray-800"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </Button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-100 text-gray-800"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>

          {/* Campaign Config */}
          <div>
            <h2 className="text-lg font-semibold mt-8 mb-2">Campaign Configuration</h2>
            <div className="text-sm space-y-1 text-gray-700">
              <p><strong>Campaign Name:</strong> {campaignConfig.name}</p>
              <p><strong>Description:</strong> {campaignConfig.description}</p>
              <p><strong>CSV File:</strong> {campaignConfig.csv}</p>
              <p><strong>Landing Page:</strong> {campaignConfig.landingPage}</p>
              <p><strong>Email Template:</strong> {campaignConfig.emailTemplate}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}