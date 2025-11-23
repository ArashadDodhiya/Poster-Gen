// components/OutputCard.tsx
"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Download, 
  ExternalLink, 
  Copy, 
  Share2, 
  CheckCircle2, 
  Image as ImageIcon,
  MessageCircle,
  Sparkles,
  Zap,
  Heart
} from "lucide-react"

export default function OutputCard({ data }: { data: { imageUrl: string | null, captions?: string[] } }) {
  const { imageUrl, captions } = data
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState<"poster" | "captions">("poster")

  const handleDownload = async () => {
    if (!imageUrl) return
    
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `poster-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    }
  }

  const shareWhatsApp = (caption: string) => {
    const text = encodeURIComponent(caption)
    const url = `https://wa.me/?text=${text}`
    window.open(url, '_blank')
  }

  const shareOnSocialMedia = (platform: string, caption: string) => {
    const text = encodeURIComponent(caption)
    let url = ''
    
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${text}`
        break
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?quote=${text}`
        break
      case 'instagram':
        // Instagram doesn't support direct sharing via URL
        alert('Copy the caption and paste it on Instagram!')
        return
      default:
        return
    }
    
    window.open(url, '_blank', 'width=600,height=400')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  if (!imageUrl && (!captions || captions.length === 0)) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6" />
          <div>
            <h3 className="text-xl font-bold">Your Poster is Ready! 🎉</h3>
            <p className="text-blue-100 text-sm">Download and share your creation</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("poster")}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-all duration-200 ${
              activeTab === "poster"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Poster Image
          </button>
          <button
            onClick={() => setActiveTab("captions")}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-all duration-200 ${
              activeTab === "captions"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Social Captions {captions && `(${captions.length})`}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {/* Poster Tab */}
          {activeTab === "poster" && imageUrl && (
            <motion.div
              key="poster"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Poster Preview */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex-1"
                >
                  <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 shadow-inner"
                  >
                    <div className="relative rounded-xl overflow-hidden shadow-lg bg-white">
                      {!imageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="animate-pulse flex flex-col items-center">
                            <Zap className="w-12 h-12 text-blue-200 mb-2" />
                            <p className="text-blue-300">Loading your poster...</p>
                          </div>
                        </div>
                      )}
                      <img 
                        src={imageUrl} 
                        alt="Generated Poster" 
                        className={`w-full h-auto transition-opacity duration-500 ${
                          imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => setImageLoaded(true)}
                      />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="lg:w-80 space-y-4"
                >
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Poster
                    </h4>
                    <p className="text-blue-700 text-sm mb-4">
                      Get high-quality PNG version of your poster
                    </p>
                    <motion.button
                      onClick={handleDownload}
                      className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download className="w-5 h-5" />
                      Download PNG
                    </motion.button>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-4">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View & Share
                    </h4>
                    <p className="text-purple-700 text-sm mb-4">
                      Open image in new tab or share directly
                    </p>
                    <div className="space-y-2">
                      <a 
                        href={imageUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full bg-white text-purple-600 border border-purple-200 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-200 text-center flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open in New Tab
                      </a>
                    </div>
                  </div>

                  <motion.div
                    variants={itemVariants}
                    className="bg-green-50 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 text-green-800 mb-2">
                      <Heart className="w-4 h-4" />
                      <span className="font-semibold">Love your poster?</span>
                    </div>
                    <p className="text-green-700 text-sm">
                      Create more variations or try different styles!
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Captions Tab */}
          {activeTab === "captions" && (
            <motion.div
              key="captions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <strong>Pro Tip:</strong> Copy these captions and use them with your poster on social media for maximum engagement!
                  </div>
                </div>
              </div>

              {captions?.length ? (
                <div className="grid gap-4">
                  {captions.map((caption, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                            {caption}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <motion.button
                            onClick={() => copyToClipboard(caption, index)}
                            className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium min-w-[80px]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {copiedIndex === index ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                Copy
                              </>
                            )}
                          </motion.button>
                          
                          <motion.button
                            onClick={() => shareWhatsApp(caption)}
                            className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200 text-sm font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Share2 className="w-4 h-4" />
                            WhatsApp
                          </motion.button>

                          <div className="flex gap-1 mt-1">
                            {['twitter', 'facebook', 'instagram'].map((platform) => (
                              <motion.button
                                key={platform}
                                onClick={() => shareOnSocialMedia(platform, caption)}
                                className="flex-1 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {platform === 'twitter' ? '🐦' : platform === 'facebook' ? '📘' : '📷'}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 text-gray-500"
                >
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p>No captions generated yet</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}