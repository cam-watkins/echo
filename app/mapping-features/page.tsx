'use client'

import { useState } from 'react'
import Sidebar from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const dummyFeatures = [
  { id: 1, name: 'AI Assistant' },
  { id: 2, name: 'CRM Integration' },
  { id: 3, name: 'Live Analytics' },
]

const initialBuyerSignals = [
  'Hiring AI Engineers',
  'Scaling Sales Team',
  'High Website Traffic',
  'Launching AI Product',
  'Announced Funding',
  'Expanding Sales Territories'
]

export default function FeatureMappingPage() {
  const [activeTab, setActiveTab] = useState<'features' | 'buyer-signals'>('features')
  const [selectedFeatureId, setSelectedFeatureId] = useState<number | null>(dummyFeatures[0].id)
  const [buyerSignals, setBuyerSignals] = useState(initialBuyerSignals)
  const [mappedSignals, setMappedSignals] = useState<string[]>([])

  const handleDragEnd = (result) => {
    const { source, destination } = result
    if (!destination) return

    // Dragging from buyer signals to mapping area
    if (source.droppableId === 'buyerSignals' && destination.droppableId === 'mappedSignals') {
      const moved = buyerSignals[source.index]
      setBuyerSignals(prev => prev.filter((_, i) => i !== source.index))
      setMappedSignals(prev => [...prev, moved])
    }

    // Reordering inside mapped signals
    if (source.droppableId === 'mappedSignals' && destination.droppableId === 'mappedSignals') {
      const updated = [...mappedSignals]
      const [moved] = updated.splice(source.index, 1)
      updated.splice(destination.index, 0, moved)
      setMappedSignals(updated)
    }
  }

  const handleRemoveMapped = (index: number) => {
    const removed = mappedSignals[index]
    setMappedSignals(prev => prev.filter((_, i) => i !== index))
    setBuyerSignals(prev => [...prev, removed])
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-white p-8 overflow-hidden">
        <div className="max-w-6xl mx-auto h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Mapping</h1>
          </div>

          <div className="flex gap-2 mb-6">
            <Button
              onClick={() => setActiveTab('features')}
              className={`px-5 py-2 text-base ${activeTab === 'features' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
            >
              Features
            </Button>
            <Button
              onClick={() => setActiveTab('buyer-signals')}
              className={`px-5 py-2 text-base ${activeTab === 'buyer-signals' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
            >
              Buyer Signals
            </Button>
          </div>

          <div className="overflow-x-auto whitespace-nowrap mb-4 border-b pb-2">
            {dummyFeatures.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setSelectedFeatureId(feature.id)}
                className={`inline-block px-4 py-2 mr-2 rounded-md text-sm border hover:bg-gray-100 transition ${
                  selectedFeatureId === feature.id ? 'bg-blue-100 border-blue-500 text-blue-800 font-semibold' : 'bg-white border-gray-300 text-gray-800'
                }`}
              >
                {feature.name}
              </button>
            ))}
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex-1 flex gap-6 overflow-hidden">
              <div className="w-1/3 border rounded-md p-4 bg-gray-50 flex flex-col">
                <h2 className="text-md font-semibold mb-2 text-gray-700">Buyer Signals</h2>
                <Droppable droppableId="buyerSignals">
                  {(provided) => (
                    <div
                      className="space-y-2 max-h-60 overflow-y-auto pr-2"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {buyerSignals.map((signal, index) => (
                        <Draggable key={signal} draggableId={signal} index={index}>
                          {(provided) => (
                            <div
                              className="bg-white border px-3 py-2 rounded-md shadow-sm text-sm text-gray-800"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {signal}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                <h2 className="text-md font-semibold mt-4 mb-2 text-gray-700">Defaults</h2>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                  {/* Empty for now */}
                </div>
              </div>

              <div className="flex-1 border rounded-md p-4 bg-gray-50">
                <h2 className="text-md font-semibold text-gray-800 mb-2">
                  Mapping for: <span className="font-semibold">{dummyFeatures.find(f => f.id === selectedFeatureId)?.name}</span>
                </h2>
                <Droppable droppableId="mappedSignals">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="border-dashed border-2 border-gray-300 rounded-md min-h-[180px] p-4 space-y-2"
                    >
                      {mappedSignals.length === 0 ? (
                        <div className="text-gray-400">Drag signals here...</div>
                      ) : (
                        mappedSignals.map((signal, index) => (
                          <Draggable key={signal} draggableId={signal} index={index}>
                            {(provided) => (
                              <div
                                className="flex justify-between items-center bg-white border px-3 py-2 rounded-md shadow-sm text-sm text-gray-800"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <span className="font-medium mr-2">{index + 1}.</span> {signal}
                                <button
                                  onClick={() => handleRemoveMapped(index)}
                                  className="ml-auto text-sm text-red-600 hover:underline"
                                >
                                  Remove
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </DragDropContext>
        </div>
      </main>
    </div>
  )
}
