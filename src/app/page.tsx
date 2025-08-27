"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Feather, Scroll } from "lucide-react";

interface PoetryRequest {
  character: string;
  location: string;
  event: string;
  emotion: string;
}

interface GeneratedPoetry {
  title: string;
  content: string;
}

export default function Home() {
  const [poetryRequest, setPoetryRequest] = useState<PoetryRequest>({
    character: "",
    location: "",
    event: "",
    emotion: "",
  });
  const [generatedPoetry, setGeneratedPoetry] = useState<GeneratedPoetry | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  const handleGenerate = async () => {
    if (!poetryRequest.character || !poetryRequest.location || !poetryRequest.event || !poetryRequest.emotion) {
      return;
    }

    setIsGenerating(true);
    setIsRevealing(false);
    setGeneratedPoetry(null);

    try {
      const response = await fetch("/api/generate-poetry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(poetryRequest),
      });

      if (!response.ok) {
        throw new Error("Error al generar poesía");
      }

      const data = await response.json();
      setGeneratedPoetry(data);
      
      // Trigger reveal animation
      setTimeout(() => setIsRevealing(true), 100);
    } catch (error) {
      console.error("Error generating poetry:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const formatPoemContent = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    return lines.map((line, index) => {
      if (index === 0) {
        // Add illuminated drop capital to first line
        const firstChar = line.charAt(0);
        const restOfLine = line.slice(1);
        return (
          <div key={index} className="relative mb-6">
            <span className="illuminated-dropcap inline-block text-6xl md:text-8xl font-bold mr-2 align-top leading-none">
              {firstChar}
            </span>
            <span className="inline-block align-top leading-relaxed">{restOfLine}</span>
          </div>
        );
      }
      return (
        <div key={index} className="mb-6 leading-relaxed">
          {line}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-amber-50 p-4 md:p-8">
      {/* Parchment background texture */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(139, 69, 19, 0.03) 10px,
              rgba(139, 69, 19, 0.03) 20px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 10px,
              rgba(160, 82, 45, 0.02) 10px,
              rgba(160, 82, 45, 0.02) 20px
            )
          `,
        }}
      />
      
      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Feather className="w-8 h-8 text-amber-900" />
            <h1 className="text-4xl md:text-6xl font-bold text-amber-900" style={{ fontFamily: "'MedievalSharp', 'Uncial Antiqua', serif" }}>
              Generador de Poesía Medieval
            </h1>
            <Scroll className="w-8 h-8 text-amber-900" />
          </div>
          <p className="text-lg md:text-xl text-amber-800 max-w-2xl mx-auto" style={{ fontFamily: "'Cinzel', serif" }}>
            Crea versos medievales auténticos con escritura iluminada y sabiduría antigua
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="bg-amber-100/80 border-amber-300 shadow-lg medieval-border">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-amber-900" style={{ fontFamily: "'Cinzel', serif" }}>
                Compone Tu Verso
              </CardTitle>
              <CardDescription className="text-amber-700">
                Selecciona los elementos para tu poema medieval
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="character" className="text-amber-900 font-semibold">
                  Personaje
                </Label>
                <Select value={poetryRequest.character} onValueChange={(value) => setPoetryRequest(prev => ({ ...prev, character: value }))}>
                  <SelectTrigger className="bg-amber-50 border-amber-300 text-amber-900">
                    <SelectValue placeholder="Elige tu personaje" />
                  </SelectTrigger>
                  <SelectContent className="bg-amber-50 border-amber-300">
                    <SelectItem value="hero">Héroe</SelectItem>
                    <SelectItem value="noble">Noble</SelectItem>
                    <SelectItem value="commoner">Común</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-amber-900 font-semibold">
                  Ubicación
                </Label>
                <Select value={poetryRequest.location} onValueChange={(value) => setPoetryRequest(prev => ({ ...prev, location: value }))}>
                  <SelectTrigger className="bg-amber-50 border-amber-300 text-amber-900">
                    <SelectValue placeholder="Elige tu escenario" />
                  </SelectTrigger>
                  <SelectContent className="bg-amber-50 border-amber-300">
                    <SelectItem value="castle">Castillo</SelectItem>
                    <SelectItem value="forest">Bosque</SelectItem>
                    <SelectItem value="village">Pueblo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="event" className="text-amber-900 font-semibold">
                  Evento
                </Label>
                <Select value={poetryRequest.event} onValueChange={(value) => setPoetryRequest(prev => ({ ...prev, event: value }))}>
                  <SelectTrigger className="bg-amber-50 border-amber-300 text-amber-900">
                    <SelectValue placeholder="Elige tu evento" />
                  </SelectTrigger>
                  <SelectContent className="bg-amber-50 border-amber-300">
                    <SelectItem value="battle">Batalla</SelectItem>
                    <SelectItem value="love">Amor</SelectItem>
                    <SelectItem value="treachery">Traición</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emotion" className="text-amber-900 font-semibold">
                  Emoción
                </Label>
                <Select value={poetryRequest.emotion} onValueChange={(value) => setPoetryRequest(prev => ({ ...prev, emotion: value }))}>
                  <SelectTrigger className="bg-amber-50 border-amber-300 text-amber-900">
                    <SelectValue placeholder="Elige tu emoción" />
                  </SelectTrigger>
                  <SelectContent className="bg-amber-50 border-amber-300">
                    <SelectItem value="joy">Alegría</SelectItem>
                    <SelectItem value="sorrow">Tristeza</SelectItem>
                    <SelectItem value="rage">Ira</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={!poetryRequest.character || !poetryRequest.location || !poetryRequest.event || !poetryRequest.emotion || isGenerating}
                className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50 font-semibold py-3"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando Tu Verso...
                  </>
                ) : (
                  <>
                    <Feather className="mr-2 h-4 w-4" />
                    Generar Poesía
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Poetry Display */}
          <Card className="bg-amber-100/80 border-amber-300 shadow-lg min-h-[400px] medieval-border">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-amber-900" style={{ fontFamily: "'Cinzel', serif" }}>
                Tu Verso Iluminado
              </CardTitle>
              <CardDescription className="text-amber-700">
                Contempla la poesía creada
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedPoetry ? (
                <div className={`space-y-6 transition-all duration-2000 ease-out ${isRevealing ? 'opacity-100 translate-y-0 ink-bleed-reveal' : 'opacity-0 translate-y-4'}`}>
                  <h2 className="text-2xl font-bold text-center text-amber-900 mb-8" style={{ fontFamily: "'MedievalSharp', 'Uncial Antiqua', serif" }}>
                    {generatedPoetry.title}
                  </h2>
                  <div className="text-lg text-amber-900 leading-relaxed font-serif" style={{ fontFamily: "'Uncial Antiqua', 'Cinzel', serif" }}>
                    {formatPoemContent(generatedPoetry.content)}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-amber-600">
                  <div className="text-center">
                    <Scroll className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg" style={{ fontFamily: "'Cinzel', serif" }}>
                      Tu verso espera ser creado...
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Google Fonts for medieval styling */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=MedievalSharp&family=Uncial+Antiqua&display=swap');
        
        .illuminated-letter {
          background: linear-gradient(135deg, #d4a574 0%, #8b4513 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 2px 2px 4px rgba(139, 69, 19, 0.3);
        }
        
        .parchment-texture {
          background-image: 
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(139, 69, 19, 0.03) 10px,
              rgba(139, 69, 19, 0.03) 20px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 10px,
              rgba(160, 82, 45, 0.02) 10px,
              rgba(160, 82, 45, 0.02) 20px
            );
        }

        .illuminated-dropcap {
          position: relative;
          display: inline-block;
          color: #8b4513;
          text-shadow: 
            2px 2px 4px rgba(139, 69, 19, 0.3),
            0 0 10px rgba(212, 165, 116, 0.5);
          background: linear-gradient(45deg, #d4a574, #8b4513, #d4a574);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s ease-in-out infinite;
        }

        .illuminated-dropcap::before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q35 15 45 20 Q50 25 45 35 Q40 45 30 50 Q20 45 15 35 Q10 25 15 20 Q25 15 30 5' fill='none' stroke='%23d4a574' stroke-width='1' opacity='0.3'/%3E%3C/svg%3E") no-repeat center;
          background-size: contain;
          z-index: -1;
          opacity: 0.7;
        }

        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes inkBleed {
          0% { 
            opacity: 0; 
            transform: scale(0.8) translateY(20px);
            filter: blur(2px);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.02) translateY(-2px);
            filter: blur(1px);
          }
          100% { 
            opacity: 1; 
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        .ink-bleed-reveal {
          animation: inkBleed 2.5s ease-out forwards;
        }

        .medieval-border {
          border: 3px solid #8b4513;
          border-image: linear-gradient(45deg, #d4a574, #8b4513, #d4a574) 1;
          box-shadow: 
            inset 0 0 20px rgba(139, 69, 19, 0.1),
            0 4px 8px rgba(139, 69, 19, 0.2);
        }
      `}</style>
    </div>
  );
}
