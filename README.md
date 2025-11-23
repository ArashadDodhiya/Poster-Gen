# Poster-Gen: AI-Powered Marketing Poster Generator

**Poster-Gen** is a modern web application that empowers local businesses to create professional-quality marketing posters in seconds using Artificial Intelligence. No design skills required!

## 🚀 Features

*   **AI-Powered Design**: Generates unique and visually appealing posters tailored to your business type.
*   **Smart Caption Generation**: Automatically creates engaging social media captions to go with your posters.
*   **Business Customization**: Supports various business types including Cake Shops, Restaurants, Salons, Gyms, and more.
*   **Style & Color Control**: Choose from Modern, Festive, Minimal, or Bold styles and a variety of color schemes.
*   **Logo Integration**: Upload your business logo to seamlessly integrate it into the poster design.
*   **One-Click Download**: Download high-quality PNGs of your generated posters.
*   **Social Sharing**: Easily copy captions and share your creations on WhatsApp, Twitter, and Facebook.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/) for animations.
*   **AI Integration**:
    *   **Image Generation**: [OpenAI DALL-E 3](https://openai.com/)
    *   **Text Generation**: [Google Gemini 1.5 Flash](https://deepmind.google/technologies/gemini/)
*   **Backend/Storage**: [Supabase](https://supabase.com/) (Auth & Storage)
*   **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   Node.js 18+ installed
*   npm or yarn
*   Git

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ArashadDodhiya/Poster-Gen.git
    cd Poster-Gen
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory and add the following environment variables:

    ```env
    # OpenAI (For Image Generation)
    OPENAI_API_KEY=your_openai_api_key

    # Google Gemini (For Caption Generation)
    GEMINI_API_KEY=your_gemini_api_key

    # Supabase (For Storage & Auth)
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Open your browser**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action.

## 🚀 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/).

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add the environment variables in the Vercel dashboard.
4.  Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
