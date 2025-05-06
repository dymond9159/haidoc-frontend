"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Mic, MicOff, Video, VideoOff } from "lucide-react"

interface VideoCallInterfaceProps {
  isVideoOn: boolean
  isAudioOn: boolean
  onToggleVideo: () => void
  onToggleAudio: () => void
  onEndCall: () => void
}

export function VideoCallInterface({
  isVideoOn,
  isAudioOn,
  onToggleVideo,
  onToggleAudio,
  onEndCall,
}: VideoCallInterfaceProps) {
  // Mock video streams with placeholder images
  const patientVideoUrl = "/images/placeholder.svg?height=720&width=1280&text=Patient"
  const doctorVideoUrl = "/images/placeholder.svg?height=720&width=1280&text=Doctor"

  return (
    <div className="relative w-full h-full">
      {/* Main video (patient) */}
      <div className="absolute inset-0 bg-black">
        {/* <img
          src={patientVideoUrl || "/images/placeholder.svg"}
          alt="Patient video"
          className="w-full h-full object-cover"
        /> */}
      </div>

      {/* Doctor video (small window) */}
      <div className="absolute top-4 left-4 w-[160px] h-[160px] bg-gray-800 rounded-lg overflow-hidden shadow-lg border-1 border-white z-10">
        {/* <img
          src={doctorVideoUrl || "/images/placeholder.svg"}
          alt="Doctor video"
          className={cn("w-full h-full object-cover", !isVideoOn && "opacity-50 blur-sm")}
        /> */}
        {!isVideoOn && (
          <div className="absolute inset-0 flex items-center justify-center">
            <VideoOff className="h-8 w-8 text-white opacity-70" />
          </div>
        )}
      </div>

      {/* Control buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        <Button
          onClick={onToggleVideo}
          variant="secondary"
          size="icon"
          className={cn(
            "h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 text-white",
            !isVideoOn && "bg-red-500 hover:bg-red-600",
          )}
        >
          {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
        </Button>

        <Button
          onClick={onEndCall}
          variant="destructive"
          className="h-12 px-6 rounded-full bg-red-500 hover:bg-red-600"
        >
          Encerrar
        </Button>

        <Button
          onClick={onToggleAudio}
          variant="secondary"
          size="icon"
          className={cn(
            "h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 text-white",
            !isAudioOn && "bg-red-500 hover:bg-red-600",
          )}
        >
          {isAudioOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
        </Button>
      </div>
    </div>
  )
}
