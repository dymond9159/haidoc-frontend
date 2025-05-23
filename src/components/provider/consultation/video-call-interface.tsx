"use client"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { GripHorizontal, MessageCircleIcon, Mic, MicOff, PhoneIcon, Video, VideoOff } from "lucide-react"
import { useTranslations } from "next-intl"

interface VideoCallInterfaceProps {
  isVideoOn: boolean
  isAudioOn: boolean
  onToggleVideo: () => void
  onToggleAudio: () => void
  onEndCall: () => void
  onOpenChat?: () => void
  onOpenFeatureBar?: () => void
}

export function VideoCallInterface({
  isVideoOn,
  isAudioOn,
  onToggleVideo,
  onToggleAudio,
  onEndCall,
  onOpenChat,
  onOpenFeatureBar,
}: VideoCallInterfaceProps) {
  const t = useTranslations("videoCall")

  const isMobile = useMobile()

  const patientVideoUrl = "/images/placeholder.svg?height=720&width=1280&text=Patient"
  const doctorVideoUrl = "/images/placeholder.svg?height=720&width=1280&text=Doctor"

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute top-4 left-4 w-[160px] h-[160px] bg-gray-800 rounded-lg overflow-hidden shadow-lg border-1 border-white z-10">
        {!isVideoOn && (
          <div className="absolute inset-0 flex items-center justify-center">
            <VideoOff className="h-8 w-8 text-white opacity-70" />
          </div>
        )}
      </div>

      {/* Control buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1 md:gap-4">
        {isMobile && (
          <Button
            onClick={onOpenChat}
            variant="secondary"
            size="icon"
            title={t("chatTooltip")}
            className={cn("h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 text-white")}
          >
            <MessageCircleIcon className="h-6 w-6" />
          </Button>
        )}

        <Button
          onClick={onToggleVideo}
          variant="secondary"
          size="icon"
          title={isVideoOn ? t("turnOffVideoTooltip") : t("turnOnVideoTooltip")}
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
          title={t("endCallTooltip")}
          className="h-12 min-w-12 px-6 rounded-full bg-red-500 hover:bg-red-600"
        >
          {isMobile && <PhoneIcon className="h-6 w-6" />}
          {!isMobile && t("endCall")}
        </Button>

        <Button
          onClick={onToggleAudio}
          variant="secondary"
          size="icon"
          title={isAudioOn ? t("turnOffAudioTooltip") : t("turnOnAudioTooltip")}
          className={cn(
            "h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 text-white",
            !isAudioOn && "bg-red-500 hover:bg-red-600",
          )}
        >
          {isAudioOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
        </Button>

        {isMobile && (
          <Button
            onClick={onOpenFeatureBar}
            variant="secondary"
            size="icon"
            title={t("featuresTooltip")}
            className={cn("h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 text-white")}
          >
            <GripHorizontal className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  )
}
