import './styles.css'

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-app-bg">
      {children}
    </div>
  )
}