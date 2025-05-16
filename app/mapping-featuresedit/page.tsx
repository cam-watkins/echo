'use client'

import { useState } from "react"
import Sidebar from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Feature {
  id: number
  name: string
  description: string
  video: string
}

export default function FeaturesPage() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [showForm, setShowForm] = useState(true)
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [video, setVideo] = useState("")

  const handleSubmit = () => {
    if (editingFeature) {
      setFeatures((prev) =>
        prev.map((f) =>
          f.id === editingFeature.id ? { ...f, name, description, video } : f
        )
      )
    } else {
      const newFeature = {
        id: Date.now(),
        name,
        description,
        video,
      }
      setFeatures([...features, newFeature])
    }
    resetForm()
  }

  const handleEdit = (feature: Feature) => {
    setEditingFeature(feature)
    setName(feature.name)
    setDescription(feature.description)
    setVideo(feature.video)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    setFeatures((prev) => prev.filter((f) => f.id !== id))
  }

  const resetForm = () => {
    setEditingFeature(null)
    setName("")
    setDescription("")
    setVideo("")
    setShowForm(false)
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-white p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Features</h1>
            <Button onClick={() => setShowForm(true)} className="bg-blue-600 text-white hover:bg-blue-700">
              + Add Feature
            </Button>
          </div>

          {showForm && (
            <div className="mb-6 space-y-4 border p-4 rounded-md bg-gray-100">
              <Input
                placeholder="Feature Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white text-gray-900"
              />
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white text-gray-900"
              />
              <Input
                placeholder="Video Link or File Name (Placeholder)"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                className="bg-white text-gray-900"
              />
              <div className="flex gap-2">
                <Button onClick={handleSubmit} className="bg-blue-600 text-white hover:bg-blue-700">
                  {editingFeature ? "Update" : "Create"}
                </Button>
                <Button onClick={resetForm} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {features.length === 0 ? (
            <p className="text-gray-600">No features added yet. Use the form above to create your first feature.</p>
          ) : (
            <table className="w-full text-sm border">
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="p-2 text-gray-800">Name</th>
                  <th className="p-2 text-gray-800">Description</th>
                  <th className="p-2 text-gray-800">Video</th>
                  <th className="p-2 text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 text-gray-900">
                {features.map((f) => (
                  <tr key={f.id} className="border-t">
                    <td className="p-2">{f.name}</td>
                    <td className="p-2">{f.description}</td>
                    <td className="p-2 text-blue-600">{f.video || "N/A"}</td>
                    <td className="p-2 space-x-2">
                      <Button
                        size="sm"
                        className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                        onClick={() => handleEdit(f)}
                      >
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(f.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}
