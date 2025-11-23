// app/page.tsx
'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Sparkles, ArrowRight, Store, Camera, Palette, Zap } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Store className="w-6 h-6" />,
      title: "Cake Shops",
      description: "Sweet deals, beautiful displays"
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Salons",
      description: "Style promotions that shine"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Boutiques",
      description: "Fashion statements made easy"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Gyms & Coaching",
      description: "Energy-packed promotions"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8"
        >
          {/* Animated Header */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div
              className="flex items-center justify-center gap-2 text-blue-600 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <Sparkles className="w-8 h-8" />
              <span className="text-lg font-semibold">AI-Powered Design</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Build Posters
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                in Seconds
              </motion.span>
            </h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Professional posters for local businesses. No design skills needed.
            </motion.p>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <Link href="/generate">
              <motion.div
                className="group relative inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Generate Poster</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />

                {/* Animated background effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Target Audience */}
          <motion.div variants={itemVariants} className="pt-12">
            <p className="text-gray-500 mb-8 text-lg">Perfect for:</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="text-blue-600 mb-3 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="pt-16 flex flex-wrap justify-center gap-8 text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">Templates</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">∞</div>
              <div className="text-gray-600">Customizations</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">0</div>
              <div className="text-gray-600">Design Skills Needed</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
    </div>
  );
}