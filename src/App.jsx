import { useContext } from 'react'
import './App.css'
import LandingPage from './Component/LandingPage'
import MyCalendar from './Component/MyCalendar'
import { ThemeContext, ThemeProvider } from './Context/ThemeContext'

function AppContent() {
  const { theme } = useContext(ThemeContext);
  return (
    // When theme is dark, the "dark" class is applied to this container
    <div className={theme === "dark" ? "dark" : ""}>
      {/* This wrapper can have your default light theme styles */}
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-300">
        <LandingPage />
        <MyCalendar />
      </div>
    </div>
  );
}


function App() {

  return (
    <>
    <ThemeProvider>
    <AppContent/>
    </ThemeProvider>
    </>
  )
}

export default App
