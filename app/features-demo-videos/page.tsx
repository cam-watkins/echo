'use client'

import { useState, ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type FeatureDemo = {
  description: string
  videoFile: File | null
}

export default function FeaturesDemoPage() {
  const [features, setFeatures] = useState<FeatureDemo[]>([
    { description: "", videoFile: null },
  ])

  const handleDescriptionChange = (index: number, value: string) => {
    const updated = [...features]
    updated[index].description = value
    setFeatures(updated)
  }

  const handleFileChange = (index: number, file: File | null) => {
    const updated = [...features]
    updated[index].videoFile = file
    setFeatures(updated)
  }

  const handleAddFeature = () => {
    if (features.length < 5) {
      setFeatures([...features, { description: "", videoFile: null }])
    }
  }

  return (
    <div className="max-w-xl mx-auto py-12 space-y-6">
      <h1 className="text-2xl font-semibold">Features + Demo Videos</h1>

      {features.map((feature, index) => (
        <div key={index} className="border rounded-md p-4 space-y-4 bg-muted/10">
          <div className="space-y-2">
            <label className="font-medium">Feature Description</label>
            <Input
              placeholder="e.g. Auto-personalized cold emails"
              value={feature.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleDescriptionChange(index, e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium">Upload Demo Video (.mp4)</label>
            <div
              className="relative w-full h-32 border-2 border-dashed rounded-md flex items-center justify-center text-sm bg-white"
              onDrop={(e) => {
                e.preventDefault()
                if (e.dataTransfer.files?.[0]) {
                  handleFileChange(index, e.dataTransfer.files[0])
                }
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              {feature.videoFile ? (
                <p>{feature.videoFile.name}</p>
              ) : (
                <p>Drag & drop or click to upload</p>
              )}
              <input
                type="file"
                accept="video/mp4"
                className="absolute opacity-0 w-full h-full cursor-pointer"
                onChange={(e) =>
                  handleFileChange(index, e.target.files?.[0] ?? null)
                }
              />
            </div>
          </div>
        </div>
      ))}

      {features.length < 5 && (
        <Button onClick={handleAddFeature}>Add Another Feature + Demo</Button>
      )}

      <Button disabled className="mt-6 opacity-50 cursor-not-allowed">
        Next
      </Button>
    </div>
  )
}
