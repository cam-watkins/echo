'use client'

import Sidebar from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export default function CampaignsPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 bg-white">
        <div className="mb-6">
          <div className="text-5xl mb-4">📈</div>
          <h1 className="text-2xl font-semibold text-gray-900">Campaigns</h1>
          <p className="mt-2 text-sm text-gray-600 max-w-md">
            Campaigns help you reach the right accounts at the right time with personalized outreach. Create a new campaign to get started.
          </p>
        </div>

        <div className="flex gap-3">
          <Button>+ Create Campaign</Button>
          <Button variant="outline">Documentation</Button>
        </div>
      </main>
    </div>
  )
}
