'use client'

import { useState } from "react"
import Sidebar from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Signal {
  id: number
  name: string
  description: string
}

export default function BuyerSignalsPage() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [showForm, setShowForm] = useState(true)
  const [editingSignal, setEditingSignal] = useState<Signal | null>(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    if (editingSignal) {
      setSignals((prev) =>
        prev.map((s) =>
          s.id === editingSignal.id ? { ...s, name, description } : s
        )
      )
    } else {
      const newSignal = {
        id: Date.now(),
        name,
        description,
      }
      setSignals([...signals, newSignal])
    }
    resetForm()
  }

  const handleEdit = (signal: Signal) => {
    setEditingSignal(signal)
    setName(signal.name)
    setDescription(signal.description)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    setSignals((prev) => prev.filter((s) => s.id !== id))
  }

  const resetForm = () => {
    setEditingSignal(null)
    setName("")
    setDescription("")
    setShowForm(false)
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-white p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Buyer Signals</h1>
            <Button onClick={() => setShowForm(true)} className="bg-blue-600 text-white hover:bg-blue-700">
              + Add Signal
            </Button>
          </div>

          {showForm && (
            <div className="mb-6 space-y-4 border p-4 rounded-md bg-gray-100">
              <Input
                placeholder="Signal Name"
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
              <div className="flex gap-2">
                <Button onClick={handleSubmit} className="bg-blue-600 text-white hover:bg-blue-700">
                  {editingSignal ? "Update" : "Create"}
                </Button>
                <Button onClick={resetForm} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {signals.length === 0 ? (
            <p className="text-gray-600">No buyer signals added yet. Use the form above to create one.</p>
          ) : (
            <table className="w-full text-sm border">
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="p-2 text-gray-800">Name</th>
                  <th className="p-2 text-gray-800">Description</th>
                  <th className="p-2 text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 text-gray-900">
                {signals.map((s) => (
                  <tr key={s.id} className="border-t">
                    <td className="p-2">{s.name}</td>
                    <td className="p-2">{s.description}</td>
                    <td className="p-2 space-x-2">
                      <Button
                        size="sm"
                        className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                        onClick={() => handleEdit(s)}
                      >
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(s.id)}>
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
