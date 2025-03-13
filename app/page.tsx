import { Leaderboard } from "@/components/leaderboard"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
        <header className="border-b border-indigo-100 dark:border-indigo-950 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-900/70 sticky top-0 z-10">
          <div className="container flex h-16 items-center justify-center py-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                LLM WebDev
              </span>
              <span>Arena Leaderboard</span>
            </div>
          </div>
        </header>
        <main className="container py-6 md:py-8 mx-auto px-4 sm:px-6">
          <Leaderboard />
        </main>
      </div>
    </ThemeProvider>
  )
}

