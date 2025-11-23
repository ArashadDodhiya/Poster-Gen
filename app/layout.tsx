// app/layout.tsx
import React from 'react'
import './globals.css'

export const metadata = {
  title: "Poster MVP",
  description: "AI Poster + Caption Generator"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <div className="max-w-4xl mx-auto p-6">
          <header className="mb-6">
            <h1 className="text-3xl font-semibold">AI Poster MVP</h1>
            <p className="text-sm text-gray-600">Poster + Caption + One-click Download/Share</p>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
