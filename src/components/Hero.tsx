import React, { useState } from "react";

interface HeroProps {
  onOpenRoleModal: (role?: string) => void;
  onScrollTo: (id: string) => void;
}

const ELDER_PHOTOS = [
  {
    id: 0,
    image: "/images/grandfather_documentary.png",
    name: "Deuta",
    location: "Guwahati, Assam",
    quote: "“Sundowning restlessness calmed with familiar warmth.”",
  },
  {
    id: 1,
    image: "/images/indian_grandmother_tea.jpg",
    name: "Aai",
    location: "Dibrugarh, Assam",
    quote: "“Recognized family instantly with gentle joy.”",
  },
  {
    id: 2,
    image: "/images/indian_grandfather_radio.jpg",
    name: "Dada",
    location: "Jorhat, Assam",
    quote: "“Listening to old radio tunes in his mother tongue.”",
  },
  {
    id: 3,
    image: "/images/indian_family_album.jpg",
    name: "Maa & Rupa",
    location: "Tezpur, Assam",
    quote: "“Recalling wedding memories through the family album.”",
  },
  {
    id: 4,
    image: "/images/indian_grandfather_assam.jpg",
    name: "Shri Hazarika",
    location: "Silchar, Assam",
    quote: "“Vintage folk melodies in the morning veranda.”",
  },
];

export default function Hero({ onOpenRoleModal, onScrollTo }: HeroProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const renderCard = (item: (typeof ELDER_PHOTOS)[0], heightClass: string) => {
    const isHovered = hoveredId === item.id;
    return (
      <div
        key={item.id}
        onMouseEnter={() => setHoveredId(item.id)}
        onMouseLeave={() => setHoveredId(null)}
        className={`relative rounded-none overflow-hidden cursor-pointer transition-all duration-300 ease-out border border-[#1E4334]/20 ${heightClass} ${
          isHovered
            ? "scale-[1.08] z-30 shadow-2xl ring-2 ring-[#1E4334]"
            : hoveredId !== null
            ? "opacity-65 scale-[0.98]"
            : "opacity-100 hover:shadow-md"
        }`}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 rounded-none"
        />
        {/* Soft Ambient Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#142F24]/90 via-[#142F24]/20 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-75"
          }`}
        />

        {/* Text Details */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left z-20">
          <span className="text-xs font-serif font-bold text-[#C8F028] block leading-tight">
            {item.name}
          </span>
          {isHovered ? (
            <p className="text-[10px] text-white/95 font-sans leading-tight mt-1 line-clamp-2">
              {item.quote}
            </p>
          ) : (
            <span className="text-[9px] text-white/70 block leading-none mt-0.5">
              {item.location}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="w-full bg-[#F7F5F0] pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-24 overflow-hidden relative border-b border-[#1A1814]/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl text-primary tracking-tight font-normal leading-[1.12] mb-6 sm:mb-7">
              Every memory <br className="hidden sm:inline" />
              <span className="font-medium text-secondary pb-1 inline-block border-b-2 border-secondary/30">
                matters.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl lg:text-2xl text-on-surface-variant mb-8 sm:mb-10 max-w-xl 2xl:max-w-2xl leading-relaxed font-normal">
              Gentle cognitive games, familiar family voices, and culturally rooted reminiscence therapy for elderly loved ones across Northeast India.
            </p>

            {/* CTA Button Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => onScrollTo("how-it-works")}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#1E4334] text-[#F7F5F0] hover:bg-[#142F24] font-semibold text-sm sm:text-base transition-all shadow-xl active:scale-95 cursor-pointer"
              >
                <span>See How It Works</span>
              </button>

              <button
                onClick={() => onOpenRoleModal("patient")}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-[#1A1814] hover:bg-[#F7F5F0] font-semibold text-sm sm:text-base border-2 border-[#1A1814]/15 transition-all shadow-sm cursor-pointer"
              >
                Explore Surface Apps
              </button>
            </div>
          </div>

          {/* Right Hero Visual: 5-Photo Aesthetic Square Editorial Grid */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[440px] mt-4 lg:mt-0">
            <div className="w-full max-w-[500px] mx-auto flex flex-col gap-3 p-2 relative">
              
              {/* Row 1: 2 Spacious Square Photos */}
              <div className="grid grid-cols-2 gap-3">
                {renderCard(ELDER_PHOTOS[0], "h-[220px]")}
                {renderCard(ELDER_PHOTOS[1], "h-[220px]")}
              </div>

              {/* Row 2: 3 Square Photos */}
              <div className="grid grid-cols-3 gap-3">
                {renderCard(ELDER_PHOTOS[2], "h-[190px]")}
                {renderCard(ELDER_PHOTOS[3], "h-[190px]")}
                {renderCard(ELDER_PHOTOS[4], "h-[190px]")}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

