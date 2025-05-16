'use client'

import { useState } from "react"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Button } from "../../components/ui/button"
import { ChangeEvent } from "react"

export default function Page() {
  const [companyName, setCompanyName] = useState("")
  const [description, setDescription] = useState("")
  const [website, setWebsite] = useState("")

  return (
    <div className="max-w-xl mx-auto py-12 space-y-6">
      <h1 className="text-2xl font-semibold">Company Info</h1>

      <div className="space-y-2">
        <label className="font-medium">Company Name</label>
        <Input
          placeholder="Acme Inc."
          value={companyName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="font-medium">Short Description</label>
        <Textarea
          placeholder="We use AI to help sales teams send better outreach..."
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label className="font-medium">Website</label>
        <Input
          type="url"
          placeholder="https://example.com"
          value={website}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setWebsite(e.target.value)}
        />
      </div>

      <Button disabled className="mt-6 opacity-50 cursor-not-allowed">
        Next
      </Button>
    </div>
  )
}
