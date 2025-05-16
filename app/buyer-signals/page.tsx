'use client'

import { useState, ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function BuyerSignalsPage() {
  const [inputValue, setInputValue] = useState("")
  const [signals, setSignals] = useState<string[]>([])

  const handleAddSignal = () => {
    if (inputValue.trim() === "" || signals.length >= 5) return
    setSignals([...signals, inputValue.trim()])
    setInputValue("")
  }

  const handleRemoveSignal = (index: number) => {
    setSignals(signals.filter((_, i) => i !== index))
  }

  return (
    <div className="max-w-xl mx-auto py-12 space-y-6">
      <h1 className="text-2xl font-semibold">Buyer Signals</h1>

      <div className="space-y-2">
        <label className="font-medium">Add a buyer signal</label>
        <div className="flex gap-2">
          <Input
            placeholder='e.g. "hiring ML engineers"'
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          />
          <Button onClick={handleAddSignal} disabled={signals.length >= 5}>
            Add
          </Button>
        </div>
      </div>

      {signals.length > 0 && (
        <div className="space-y-2">
          <p className="font-medium">Added Signals:</p>
          <div className="flex flex-wrap gap-2">
            {signals.map((signal, index) => (
              <div
                key={index}
                className="px-3 py-1 rounded-full bg-muted text-sm flex items-center gap-2 border"
              >
                {signal}
                <button
                  onClick={() => handleRemoveSignal(index)}
                  className="text-xs text-destructive hover:underline"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button disabled className="mt-6 opacity-50 cursor-not-allowed">
        Next
      </Button>
    </div>
  )
}
