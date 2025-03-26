import { ThemeProvider } from 'ui-library'
import './App.css'
import Home from './pages/Home'

function App() {
  return (
    <ThemeProvider defaultMode="light">
      <Home />
    </ThemeProvider>
  )
}

export default App
