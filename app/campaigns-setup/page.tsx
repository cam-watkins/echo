'use client'

import { useState, ChangeEvent } from "react"
import Papa from "papaparse"
import Sidebar from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function CampaignSetupPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [csvHeaders, setCsvHeaders] = useState<string[]>([])
  const [csvPreview, setCsvPreview] = useState<string[][]>([])
  const [selectedLanding, setSelectedLanding] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const handleCSVUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setCsvFile(file)

    Papa.parse(file, {
      complete: (results) => {
        const data = results.data as string[][]
        const headers = data[0] || []
        const preview = data.slice(1, 6)

        setCsvHeaders(headers)
        setCsvPreview(preview)
      },
      error: (err) => {
        console.error("CSV parsing error:", err)
      }
    })
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-white p-8 text-black">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-2xl font-semibold">Set Up Your Campaign</h1>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-black font-medium">
              Campaign Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. AI Outreach"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white text-black border border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-black font-medium">
              Campaign Description
            </Label>
            <Textarea
              id="description"
              placeholder="What is this campaign about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="bg-white text-black border border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="csv" className="text-black font-medium">
              Upload CSV
            </Label>
            <Input
              id="csv"
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="bg-white text-black border border-gray-300"
            />
            {csvFile && (
              <p className="text-sm text-gray-700 mt-1">Uploaded: {csvFile.name}</p>
            )}
            {csvHeaders.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">CSV Preview:</p>
                <div className="overflow-x-auto max-w-full border border-gray-200 rounded-md">
                  <table className="min-w-full text-sm text-left text-black">
                    <thead className="bg-gray-200">
                      <tr>
                        {csvHeaders.map((header, i) => (
                          <th key={i} className="px-4 py-2 border-b font-medium">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-gray-100">
                      {csvPreview.map((row, i) => (
                        <tr key={i} className="border-b">
                          {row.map((cell, j) => (
                            <td key={j} className="px-4 py-2">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="landing" className="text-black font-medium">
              Landing Page
            </Label>
            <select
              id="landing"
              value={selectedLanding}
              onChange={(e) => setSelectedLanding(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm text-black bg-white"
            >
              <option value="">Select a landing page</option>
              <option>Modern White</option>
              <option>Bold Gradient</option>
              <option>Minimal Product</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="template" className="text-black font-medium">
              Email Template
            </Label>
            <select
              id="template"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm text-black bg-white"
            >
              <option value="">Select an email template</option>
              <option>Casual + Friendly</option>
              <option>Professional</option>
              <option>Short + Direct</option>
            </select>
          </div>

          <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
            Launch Campaign
          </Button>
        </div>
      </main>
    </div>
  )
}


