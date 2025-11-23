// components/PosterForm.tsx
"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "../lib/supabaseClient"
import { 
  Upload, 
  Sparkles, 
  Palette, 
  Type, 
  Building2, 
  Image,
  Loader2,
  CheckCircle2,
  X
} from "lucide-react"

export default function PosterForm({ onResult }: { onResult: (r: any) => void }) {
  const [businessType, setBusinessType] = useState("Cake Shop")
  const [headline, setHeadline] = useState("")
  const [details, setDetails] = useState("")
  const [style, setStyle] = useState("modern")
  const [colors, setColors] = useState("bright")
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const businessTypes = [
  { value: "Restaurant", icon: "🍽️", color: "from-red-500 to-orange-500" },
  { value: "Clothing Store", icon: "👗", color: "from-pink-500 to-rose-500" },
  { value: "Beauty Salon", icon: "💇", color: "from-purple-500 to-indigo-500" },
  { value: "Gym / Fitness", icon: "💪", color: "from-orange-500 to-red-600" },
  { value: "Real Estate", icon: "🏡", color: "from-green-600 to-emerald-700" },
  { value: "Grocery Store", icon: "🛒", color: "from-yellow-500 to-lime-600" },
  { value: "Home Services", icon: "🛠️", color: "from-blue-500 to-cyan-600" },
  { value: "Tuition / Coaching", icon: "📚", color: "from-amber-500 to-yellow-600" },

  // Your older ones:
  { value: "Cake Shop", icon: "🎂", color: "from-pink-500 to-rose-500" },
  { value: "Tiffin Service", icon: "🍱", color: "from-green-500 to-emerald-500" },
  { value: "Boutique", icon: "👜", color: "from-blue-500 to-cyan-500" },
  { value: "Cafe", icon: "☕", color: "from-stone-600 to-amber-700" },
]


  const styles = [
    { value: "modern", label: "Modern", description: "Clean and contemporary" },
    { value: "festive", label: "Festive", description: "Colorful and celebratory" },
    { value: "minimal", label: "Minimal", description: "Simple and elegant" },
    { value: "bold", label: "Bold", description: "Strong and attention-grabbing" },
  ]

  const colorSchemes = [
    { value: "bright", label: "Bright & Energetic", colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"] },
    { value: "pastel", label: "Soft Pastel", colors: ["#FFD6E7", "#C5EBC3", "#B5DEFF"] },
    { value: "warm", label: "Warm Tones", colors: ["#FFA726", "#FF7043", "#AB47BC"] },
    { value: "cool", label: "Cool Tones", colors: ["#42A5F5", "#26C6DA", "#66BB6A"] },
  ]

  async function uploadLogo(file: File) {
    const fileExt = file.name.split('.').pop()
    const fileName = `logo-${Date.now()}.${fileExt}`
    const { data, error } = await supabase.storage.from('posters').upload(fileName, file)
    if (error) throw error
    const { data: urlData } = supabase.storage.from('posters').getPublicUrl(fileName)
    return urlData.publicUrl
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const previewUrl = URL.createObjectURL(file)
      setLogoPreview(previewUrl)
    }
  }

  const removeLogo = () => {
    setLogoFile(null)
    setLogoPreview(null)
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview)
    }
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      let logoUrl: string | null = null
      if (logoFile) {
        logoUrl = await uploadLogo(logoFile)
      }

      const posterRes = await fetch('/api/generatePoster', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessType, headline, details, style, colors, logoUrl })
      })

      const posterData = await posterRes.json()
      if (posterData.error) throw new Error(posterData.error)

      const capRes = await fetch('/api/generateCaption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessType, headline, details })
      })
      const capData = await capRes.json()
      if (capData.error) throw new Error(capData.error)

      const captions = capData.text?.split(/\n+/).filter(Boolean).slice(0,3) ?? []
      onResult({ imageUrl: posterData.imageUrl, captions })
    } catch (err: any) {
      alert('Error: ' + (err.message || String(err)))
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step <= currentStep 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-24 h-1 mx-2 ${
                  step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Business Info</span>
          <span>Design</span>
          <span>Content</span>
        </div>
      </div>

      <form onSubmit={handleGenerate} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        
        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Business Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h2 className="text-2xl font-bold text-gray-800">Business Information</h2>
                  <p className="text-gray-600">Tell us about your business</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Business Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {businessTypes.map((type) => (
                      <motion.button
                        key={type.value}
                        type="button"
                        onClick={() => setBusinessType(type.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          businessType === type.value
                            ? `border-blue-500 bg-gradient-to-r ${type.color} text-white shadow-lg scale-105`
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-2xl mb-2">{type.icon}</div>
                        <div className="text-sm font-medium">{type.value}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Upload Logo (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors duration-200">
                    {logoPreview ? (
                      <div className="flex flex-col items-center">
                        <div className="relative inline-block">
                          <img
                            src={logoPreview}
                            alt="Logo preview"
                            className="w-32 h-32 object-contain rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={removeLogo}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Logo ready to use</p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-2">Drag and drop or click to upload</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label
                          htmlFor="logo-upload"
                          className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                        >
                          Choose File
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Design Preferences */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <Palette className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <h2 className="text-2xl font-bold text-gray-800">Design Preferences</h2>
                  <p className="text-gray-600">Choose your poster style</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Design Style
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {styles.map((styleOption) => (
                      <motion.button
                        key={styleOption.value}
                        type="button"
                        onClick={() => setStyle(styleOption.value)}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          style === styleOption.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="font-medium mb-1">{styleOption.label}</div>
                        <div className="text-sm text-gray-600">{styleOption.description}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Color Scheme
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {colorSchemes.map((scheme) => (
                      <motion.button
                        key={scheme.value}
                        type="button"
                        onClick={() => setColors(scheme.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          colors === scheme.value
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex gap-1 mb-2">
                          {scheme.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 rounded-full border"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="text-sm font-medium text-gray-700">{scheme.label}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Poster Content */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <Type className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h2 className="text-2xl font-bold text-gray-800">Poster Content</h2>
                  <p className="text-gray-600">What's your message?</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Headline / Offer *
                  </label>
                  <motion.input
                    required
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="🎉 50% OFF this weekend only! 🎉"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Details (Optional)
                  </label>
                  <motion.textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                    rows={4}
                    placeholder="✨ Valid on all cakes and pastries\n📍 Visit us at 123 Sweet Street\n📞 Call 555-0123 to order"
                    whileFocus={{ scale: 1.01 }}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Use new lines to separate different points
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <motion.button
              type="button"
              onClick={prevStep}
              className={`px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors ${
                currentStep === 1 ? 'invisible' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back
            </motion.button>

            {currentStep < 3 ? (
              <motion.button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue
              </motion.button>
            ) : (
              <motion.button
                disabled={loading || !headline.trim()}
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Poster & Captions
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </form>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <strong>Pro Tip:</strong> Use emojis and clear calls-to-action in your headline for better engagement!
          </div>
        </div>
      </motion.div>
    </div>
  )
}