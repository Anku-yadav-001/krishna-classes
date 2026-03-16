"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, ChevronLeft, ChevronRight, Play, Image as ImageIcon, Volume2, VolumeX } from "lucide-react"

const galleryItems = [
  { id: 1, type: "image" as const, src: "/gallery/photo-9.jpeg", category: "Students", title: "Student Batch Photo", label: "Students & Faculty" },
  { id: 2, type: "video" as const, src: "/gallery/video-1.mp4", category: "Campus", title: "Batch Celebration Video", label: "Batch Celebration" },
  { id: 3, type: "video" as const, src: "/gallery/video-2.mp4", category: "Students", title: "Students in Action", label: "Student Moments" },
  { id: 4, type: "image" as const, src: "/gallery/photo-7.jpeg", category: "Classrooms", title: "Classroom Session", label: "Daily Class Session" },
  { id: 5, type: "video" as const, src: "/gallery/video-3.mp4", category: "Students", title: "Classroom in Action", label: "Live Classroom" },
  { id: 6, type: "video" as const, src: "/gallery/video-4.mp4", category: "Students", title: "Learning Environment", label: "Study Environment" },
  { id: 7, type: "image" as const, src: "/gallery/photo-6.jpeg", category: "Campus", title: "Krishna Classes Building", label: "Our Campus" },
  { id: 8, type: "image" as const, src: "/gallery/photo-8.jpeg", category: "Campus", title: "Institute Entrance", label: "Reception Area" },
  { id: 9, type: "image" as const, src: "/gallery/photo-5.jpeg", category: "Campus", title: "Course Offerings", label: "Courses We Offer" },
  { id: 10, type: "image" as const, src: "/gallery/photo-1.jpeg", category: "Achievements", title: "Yash Arora — 90%", label: "Class X · 90% · Topper" },
  { id: 11, type: "image" as const, src: "/gallery/photo-2.jpeg", category: "Achievements", title: "Ishika Bagde — 96%", label: "Class X · 96% · Topper" },
  { id: 12, type: "image" as const, src: "/gallery/photo-4.jpeg", category: "Achievements", title: "Khushi Malik — 88%", label: "Class X · 88% · Topper" },
]

const categories = ["All", "Achievements", "Students", "Classrooms", "Campus"]

type GalleryItem = (typeof galleryItems)[number]

// ─── Bottom label strip ───────────────────────────────────────────────────────
function BottomLabel({ label, type }: { label: string; type: "image" | "video" }) {
  return (
    <div className="absolute bottom-0 inset-x-0 z-20 pointer-events-none">
      <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-6 pb-2 px-2.5">
        <div className="flex items-center justify-between gap-1">
          <p className="text-white text-[10px] sm:text-xs font-semibold leading-tight truncate">{label}</p>
          <span className="shrink-0 flex items-center gap-0.5 bg-white/20 backdrop-blur-sm text-white text-[8px] sm:text-[9px] font-medium px-1.5 py-0.5 rounded-full">
            {type === "video"
              ? <><Play className="h-2 w-2 fill-white" /> Video</>
              : <><ImageIcon className="h-2 w-2" /> Photo</>}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Video thumbnail card ─────────────────────────────────────────────────────
function VideoCard({
  item, onClick, onHoverStart, onHoverEnd,
}: {
  item: GalleryItem
  onClick: () => void
  onHoverStart: () => void
  onHoverEnd: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [thumb, setThumb] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)

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
      {thumb ? (
        <img src={thumb} alt={item.title} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`} />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}>
          <Play className="h-8 w-8 text-primary/40" />
        </div>
      )}
      <video ref={videoRef} src={item.src} muted loop playsInline preload="none"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
      {!isHovered && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border-2 border-white/70 shadow-lg">
            <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white fill-white ml-0.5" />
          </div>
        </div>
      )}
      <BottomLabel label={item.label} type="video" />
    </div>
  )
}

// ─── Hover popup — desktop only ───────────────────────────────────────────────
function HoverPopup({ item, visible }: { item: GalleryItem | null; visible: boolean }) {
  if (!item) return null
  return (
    // hidden on mobile (touch devices don't hover), shown md+
    <div className={`hidden md:block fixed bottom-6 right-6 z-50 w-72 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-300 pointer-events-none ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className="aspect-video bg-black relative overflow-hidden">
        {item.type === "video"
          ? <video key={item.src} src={item.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
          : <img src={item.src} alt={item.title} className="w-full h-full object-cover" />}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2">
          <p className="text-white text-xs font-semibold">{item.title}</p>
          <p className="text-white/60 text-[10px] mt-0.5">{item.category} · Click to open</p>
        </div>
      </div>
    </div>
  )
}

// ─── Lightbox video ───────────────────────────────────────────────────────────
function LightboxVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

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
    if (!newMuted && v.paused) v.play().catch(() => { })
  }, [])

  return (
    <div className="relative w-full flex items-center justify-center">
      <video ref={videoRef} src={src} loop playsInline className="max-h-[60vh] sm:max-h-[75vh] w-full object-contain" />
      <button
        onClick={toggleMute}
        className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5 bg-black/70 hover:bg-black/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-full border border-white/20 transition-colors"
      >
        {isMuted
          ? <><VolumeX className="h-3 w-3 sm:h-3.5 sm:w-3.5" /><span className="hidden sm:inline">Tap for Audio</span></>
          : <><Volume2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" /><span className="hidden sm:inline">Audio On</span></>}
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
    <section id="gallery" className="py-14 md:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Gallery</span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Life at Krishna Classes
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            A glimpse into our classrooms, campus, achievements and the students who make us proud.
          </p>
        </div>

        {/* Category Filter — horizontal scroll on mobile so pills don't wrap to multiple lines */}
        <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap sm:justify-center snap-x snap-mandatory sm:snap-none px-0.5 scrollbar-none">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className="rounded-full shrink-0 snap-start text-xs sm:text-sm"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Gallery Grid
            Mobile:  2 col (tight squares — touch-friendly tap targets)
            md:      3 col
            lg:      4 col  */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
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
                <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <BottomLabel label={item.label} type="image" />
              </div>
            )
          )}
        </div>

        {/* Hover popup — desktop only */}
        <HoverPopup item={hoveredItem} visible={popupVisible} />

        {/* Lightbox */}
        <Dialog open={selectedId !== null} onOpenChange={() => setSelectedId(null)}>
          <DialogContent className="max-w-5xl w-[95vw] sm:w-full p-0 bg-black border-none rounded-xl sm:rounded-2xl overflow-hidden">
            <div className="relative flex flex-col">

              {/* Close */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Prev */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              {/* Next */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              {/* Media */}
              <div className="w-full bg-black flex items-center justify-center min-h-[240px] sm:min-h-[300px] max-h-[60vh] sm:max-h-[75vh]">
                {selectedItem?.type === "video" ? (
                  <LightboxVideo src={selectedItem.src} />
                ) : selectedItem ? (
                  <img src={selectedItem.src} alt={selectedItem.title} className="max-h-[60vh] sm:max-h-[75vh] w-full object-contain" />
                ) : null}
              </div>

              {/* Caption bar */}
              {selectedItem && (
                <div className="bg-black/90 px-4 sm:px-6 py-3 sm:py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-white font-semibold text-sm sm:text-base truncate">{selectedItem.title}</h3>
                      <p className="text-white/60 text-xs sm:text-sm mt-0.5 truncate">{selectedItem.label}</p>
                    </div>
                    <span className="shrink-0 text-xs font-medium bg-primary/80 text-white px-2.5 sm:px-3 py-1 rounded-full">
                      {selectedItem.category}
                    </span>
                  </div>

                  {/* Dot navigation — scrollable on mobile if many items */}
                  <div className="flex justify-center gap-1 sm:gap-1.5 mt-2 sm:mt-3 overflow-x-auto pb-0.5 scrollbar-none">
                    {filtered.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        className={`h-1.5 rounded-full transition-all duration-200 shrink-0 ${item.id === selectedId ? "bg-white w-4" : "bg-white/30 hover:bg-white/60 w-1.5"}`}
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