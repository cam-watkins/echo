'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function VideoSamplesPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [duration, setDuration] = useState<number | null>(null)

  const handleFile = (file: File) => {
    if (!["video/mp4", "video/webm", "video/quicktime"].includes(file.type)) return

    const video = document.createElement("video")
    video.preload = "metadata"

    video.onloadedmetadata = () => {
      setVideoFile(file)
      setDuration(video.duration)
    }

    video.src = URL.createObjectURL(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}m ${secs}s`
  }

  const progress = duration ? Math.min((duration / 300) * 100, 100) : 0

  return (
    <div className="max-w-xl mx-auto py-12 space-y-6">
      <h1 className="text-2xl font-semibold">Upload Video Sample</h1>

      <div className="space-y-2">
        <p className="font-medium">
          Uploaded: {duration ? formatTime(duration) : "0m 0s"} / 5m
        </p>
        <Progress value={progress} />
        {duration !== null && duration < 300 && (
          <p className="text-sm text-red-600">⚠️ Video must be at least 5 minutes long.</p>
        )}
      </div>

      <div
        className="relative w-full h-32 border-2 border-dashed rounded-md flex items-center justify-center text-sm bg-white"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p>Drag & drop or click to upload one video file (.mp4, .webm)</p>
        <input
          type="file"
          accept="video/mp4,video/webm,video/quicktime"
          className="absolute opacity-0 w-full h-full cursor-pointer"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
      </div>

      {videoFile && (
        <div className="text-sm mt-2">
          ✅ Uploaded: <strong>{videoFile.name}</strong>
        </div>
      )}

      <Button disabled className="mt-6 opacity-50 cursor-not-allowed">
        Next
      </Button>
    </div>
  )
}
