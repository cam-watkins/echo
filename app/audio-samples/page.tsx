'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function AudioSamplesPage() {
  const [audioFiles, setAudioFiles] = useState<File[]>([])
  const [durations, setDurations] = useState<number[]>([]) // seconds

  const totalSeconds = durations.reduce((sum, dur) => sum + dur, 0)
  const progress = Math.min((totalSeconds / (30 * 60)) * 100, 100)

  const handleFiles = (files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach((file) => {
      if (
        !["audio/mpeg", "audio/wav", "audio/mp4", "audio/x-m4a"].includes(
          file.type
        )
      )
        return

      if (audioFiles.find((f) => f.name === file.name)) return // skip duplicates

      const audio = document.createElement("audio")
      audio.preload = "metadata"

      audio.onloadedmetadata = () => {
        setAudioFiles((prev) => [...prev, file])
        setDurations((prev) => [...prev, audio.duration])
      }

      audio.src = URL.createObjectURL(file)
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}m ${secs}s`
  }

  return (
    <div className="max-w-xl mx-auto py-12 space-y-6">
      <h1 className="text-2xl font-semibold">Upload Audio Samples</h1>

      <div className="space-y-2">
        <p className="font-medium">
          Total Uploaded: {formatTime(totalSeconds)} / 30m
        </p>
        <Progress value={progress} />
      </div>

      <div
        className="relative w-full h-32 border-2 border-dashed rounded-md flex items-center justify-center text-sm bg-white"
        onDrop={(e) => {
          e.preventDefault()
          handleFiles(e.dataTransfer.files)
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <p>Drag & drop or click to upload audio files (.mp3, .wav, .m4a)</p>
        <input
          type="file"
          accept=".mp3,.wav,.m4a"
          multiple
          className="absolute opacity-0 w-full h-full cursor-pointer"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {audioFiles.length > 0 && (
        <div className="space-y-2">
          <p className="font-medium">Uploaded Files:</p>
          <ul className="list-disc list-inside text-sm">
            {audioFiles.map((file, index) => (
              <li key={file.name}>
                {file.name} – {formatTime(durations[index] || 0)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button disabled className="mt-6 opacity-50 cursor-not-allowed">
        Next
      </Button>
    </div>
  )
}
