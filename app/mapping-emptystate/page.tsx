'use client'

import Sidebar from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export default function MappingEmptyState() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="text-center space-y-6">
          <div className="text-5xl">🧠</div>
          <h1 className="text-2xl font-semibold text-gray-900">No Mappings Yet</h1>
          <p className="text-gray-600">Start by creating buyer signals or features to map together.</p>
          <div className="flex justify-center gap-4">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">Create Buyer Signals</Button>
            <Button className="bg-gray-100 text-gray-800 hover:bg-gray-200">Create Features</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
