"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, ChevronLeft, ChevronRight, Play, Image as ImageIcon, Volume2, VolumeX } from "lucide-react"

// ─── Media items ──────────────────────────────────────────────────────────────
const galleryItems = [
  // Students
  {
    id: 1,
    type: "image" as const,
    src: "/gallery/photo-9.jpeg",
    category: "Students",
    title: "Student Batch Photo",
    label: "Students & Faculty",
  },
  {
    id: 2,
    type: "video" as const,
    src: "/gallery/video-1.mp4",
    category: "Campus",
    title: "Batch Celebration Video",
    label: "Batch Celebration",
  },
  {
    id: 3,
    type: "video" as const,
    src: "/gallery/video-2.mp4",
    category: "Students",
    title: "Students in Action",
    label: "Student Moments",
  },
  // Classrooms
  {
    id: 4,
    type: "image" as const,
    src: "/gallery/photo-7.jpeg",
    category: "Classrooms",
    title: "Classroom Session",
    label: "Daily Class Session",
  },
  {
    id: 5,
    type: "video" as const,
    src: "/gallery/video-3.mp4",
    category: "Students",
    title: "Classroom in Action",
    label: "Live Classroom",
  },
  {
    id: 6,
    type: "video" as const,
    src: "/gallery/video-4.mp4",
    category: "Students",
    title: "Learning Environment",
    label: "Study Environment",
  },
  // Campus
  {
    id: 7,
    type: "image" as const,
    src: "/gallery/photo-6.jpeg",
    category: "Campus",
    title: "Krishna Classes Building",
    label: "Our Campus",
  },
  {
    id: 8,
    type: "image" as const,
    src: "/gallery/photo-8.jpeg",
    category: "Campus",
    title: "Institute Entrance",
    label: "Reception Area",
  },
  {
    id: 9,
    type: "image" as const,
    src: "/gallery/photo-5.jpeg",
    category: "Campus",
    title: "Course Offerings",
    label: "Courses We Offer",
  },
  // Achievements
  {
    id: 10,
    type: "image" as const,
    src: "/gallery/photo-1.jpeg",
    category: "Achievements",
    title: "Yash Arora — 90%",
    label: "Class X · 90% · Topper",
  },
  {
    id: 11,
    type: "image" as const,
    src: "/gallery/photo-2.jpeg",
    category: "Achievements",
    title: "Ishika Bagde — 96%",
    label: "Class X · 96% · Topper",
  },
  {
    id: 12,
    type: "image" as const,
    src: "/gallery/photo-4.jpeg",
    category: "Achievements",
    title: "Khushi Malik — 88%",
    label: "Class X · 88% · Topper",
  },
]

const categories = ["All", "Achievements", "Students", "Classrooms", "Campus"]

type GalleryItem = (typeof galleryItems)[number]

// ─── Bottom label strip ───────────────────────────────────────────────────────
function BottomLabel({ label, type }: { label: string; type: "image" | "video" }) {
  return (
    <div className="absolute bottom-0 inset-x-0 z-20 pointer-events-none">
      <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-6 pb-2.5 px-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-white text-xs font-semibold leading-tight truncate">{label}</p>
          <span className="shrink-0 flex items-center gap-0.5 bg-white/20 backdrop-blur-sm text-white text-[9px] font-medium px-1.5 py-0.5 rounded-full">
            {type === "video"
              ? <><Play className="h-2 w-2 fill-white" /> Video</>
              : <><ImageIcon className="h-2 w-2" /> Photo</>
            }
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Video thumbnail card — silent hover preview ──────────────────────────────
function VideoCard({
  item,
  onClick,
  onHoverStart,
  onHoverEnd,
}: {
  item: GalleryItem
  onClick: () => void
  onHoverStart: () => void
  onHoverEnd: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [thumb, setThumb] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Generate unique thumbnail from the video itself at 1.5s
  useEffect(() => {
    const video = document.createElement("video")
    video.src = item.src
    video.crossOrigin = "anonymous"
    video.muted = true
    video.preload = "metadata"
    video.currentTime = 1.5
    const onSeeked = () => {
      const canvas = document.createElement("canvas")
      canvas.width = video.videoWidth || 480
      canvas.height = video.videoHeight || 270
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        setThumb(canvas.toDataURL("image/jpeg", 0.8))
      }
    }
    video.addEventListener("seeked", onSeeked)
    video.load()
    return () => video.removeEventListener("seeked", onSeeked)
  }, [item.src])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    onHoverStart()
    const v = videoRef.current
    if (v) { v.currentTime = 0; v.play().catch(() => { }) }
  }, [onHoverStart])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    onHoverEnd()
    const v = videoRef.current
    if (v) { v.pause(); v.currentTime = 0 }
  }, [onHoverEnd])

  return (
    <div
      className="group relative cursor-pointer rounded-xl overflow-hidden aspect-square bg-muted shadow-sm hover:shadow-xl transition-shadow duration-300"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Static thumbnail */}
      {thumb ? (
        <img
          src={thumb}
          alt={item.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}>
          <Play className="h-8 w-8 text-primary/40" />
        </div>
      )}

      {/* Silent hover preview */}
      <video
        ref={videoRef}
        src={item.src}
        muted
        loop
        playsInline
        preload="none"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
      />

      {/* Play icon when idle */}
      {!isHovered && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border-2 border-white/70 shadow-lg">
            <Play className="h-4 w-4 text-white fill-white ml-0.5" />
          </div>
        </div>
      )}

      <BottomLabel label={item.label} type="video" />
    </div>
  )
}

// ─── Hover popup — bottom-right corner ───────────────────────────────────────
function HoverPopup({ item, visible }: { item: GalleryItem | null; visible: boolean }) {
  if (!item) return null
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 w-72 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-300 pointer-events-none ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
    >
      <div className="aspect-video bg-black relative overflow-hidden">
        {item.type === "video" ? (
          <video key={item.src} src={item.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        ) : (
          <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2">
          <p className="text-white text-xs font-semibold">{item.title}</p>
          <p className="text-white/60 text-[10px] mt-0.5">{item.category} · Click to open</p>
        </div>
      </div>
    </div>
  )
}

// ─── Lightbox video with working audio toggle ─────────────────────────────────
// Audio works because the user explicitly clicked to open — a real user gesture.
// We start muted, then the user can tap the unmute button for audio.
// This is the ONLY reliable cross-browser approach for audio after autoplay.
function LightboxVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  // Play as soon as src changes (new video opened)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    setIsMuted(true)
    v.currentTime = 0
    v.play().catch(() => { })
    return () => { v.pause() }
  }, [src])

  const toggleMute = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    const newMuted = !v.muted
    v.muted = newMuted
    setIsMuted(newMuted)
    // If unmuting and paused, play again — this is the user gesture that allows audio
    if (!newMuted && v.paused) {
      v.play().catch(() => { })
    }
  }, [])

  return (
    <div className="relative w-full max-h-[75vh] flex items-center justify-center">
      <video
        ref={videoRef}
        src={src}
        loop
        playsInline
        className="max-h-[75vh] w-full object-contain"
      />

      {/* Mute / Unmute toggle — prominent, always visible */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-30 flex items-center gap-1.5 bg-black/70 hover:bg-black/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 transition-colors"
      >
        {isMuted ? (
          <><VolumeX className="h-3.5 w-3.5" /> Tap for Audio</>
        ) : (
          <><Volume2 className="h-3.5 w-3.5" /> Audio On</>
        )}
      </button>
    </div>
  )
}

// ─── Main Gallery Section ─────────────────────────────────────────────────────
export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [hoveredItem, setHoveredItem] = useState<GalleryItem | null>(null)
  const [popupVisible, setPopupVisible] = useState(false)
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  const selectedItem = galleryItems.find(item => item.id === selectedId) ?? null

  const handleHoverStart = useCallback((item: GalleryItem) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    hoverTimerRef.current = setTimeout(() => {
      setHoveredItem(item)
      setPopupVisible(true)
    }, 400)
  }, [])

  const handleHoverEnd = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    setPopupVisible(false)
    setTimeout(() => setHoveredItem(null), 300)
  }, [])

  const handlePrev = () => {
    if (selectedId === null) return
    const idx = filtered.findIndex(i => i.id === selectedId)
    setSelectedId((idx > 0 ? filtered[idx - 1] : filtered[filtered.length - 1]).id)
  }

  const handleNext = () => {
    if (selectedId === null) return
    const idx = filtered.findIndex(i => i.id === selectedId)
    setSelectedId((idx < filtered.length - 1 ? filtered[idx + 1] : filtered[0]).id)
  }

  return (
    <section id="gallery" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Gallery</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">
            Life at Krishna Classes
          </h2>
          <p className="mt-4 text-muted-foreground text-lg text-pretty">
            A glimpse into our classrooms, campus, achievements and the students who make us proud.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((item) =>
            item.type === "video" ? (
              <VideoCard
                key={item.id}
                item={item}
                onClick={() => setSelectedId(item.id)}
                onHoverStart={() => handleHoverStart(item)}
                onHoverEnd={handleHoverEnd}
              />
            ) : (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                onMouseEnter={() => handleHoverStart(item)}
                onMouseLeave={handleHoverEnd}
                className="group relative cursor-pointer rounded-xl overflow-hidden aspect-square bg-muted shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <BottomLabel label={item.label} type="image" />
              </div>
            )
          )}
        </div>

        {/* Hover popup */}
        <HoverPopup item={hoveredItem} visible={popupVisible} />

        {/* Full Lightbox */}
        <Dialog open={selectedId !== null} onOpenChange={() => setSelectedId(null)}>
          <DialogContent className="max-w-5xl w-full p-0 bg-black border-none rounded-2xl overflow-hidden">
            <div className="relative flex flex-col">

              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="w-full bg-black flex items-center justify-center min-h-[300px] max-h-[75vh]">
                {selectedItem?.type === "video" ? (
                  <LightboxVideo src={selectedItem.src} />
                ) : selectedItem ? (
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.title}
                    className="max-h-[75vh] w-full object-contain"
                  />
                ) : null}
              </div>

              {selectedItem && (
                <div className="bg-black/90 px-6 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-white font-semibold text-base">{selectedItem.title}</h3>
                      <p className="text-white/60 text-sm mt-0.5">{selectedItem.label}</p>
                    </div>
                    <span className="shrink-0 text-xs font-medium bg-primary/80 text-white px-3 py-1 rounded-full">
                      {selectedItem.category}
                    </span>
                  </div>
                  <div className="flex justify-center gap-1.5 mt-3">
                    {filtered.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        className={`h-1.5 rounded-full transition-all duration-200 ${item.id === selectedId ? "bg-white w-4" : "bg-white/30 hover:bg-white/60 w-1.5"
                          }`}
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>
          </DialogContent>
        </Dialog>

      </div>
    </section>
  )
}