import { ThemeProvider } from './components/theme-provider'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { I18nProvider } from './provider/langProvider'

function App() {
  return (
    <I18nProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </I18nProvider>
  )
}

export default App