'use client'

import Sidebar from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const campaigns = [
  {
    id: "1",
    name: "AI Outreach Launch",
    description: "Targeting companies hiring ML engineers",
    launchedAt: "2025-05-10",
    status: "done",
    leadCount: 143,
  },
  {
    id: "2",
    name: "Fitness Campaign",
    description: "Promoting Apple Watch for fitness buyers",
    launchedAt: "2025-05-12",
    status: "queued",
    leadCount: 89,
  },
]

export default function CampaignManagePage() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 bg-white p-8 text-black">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Top: Heading + Actions */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">
              Your Campaigns{" "}
              <span className="text-sm text-gray-500 ml-2">
                ({campaigns.length})
              </span>
            </h1>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                Delete
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Create Campaign
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Description</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Date Launched</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Leads</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Export List</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{campaign.name}</td>
                    <td className="px-4 py-3 text-gray-700">{campaign.description}</td>
                    <td className="px-4 py-3 text-gray-600">{campaign.launchedAt}</td>
                    <td className="px-4 py-3">
                      {campaign.status === "done" ? (
                        <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                          Done
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">
                          Queued
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-800">{campaign.leadCount}</td>
                    <td className="px-4 py-3">
                      <button className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 transition">
                        Export
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

