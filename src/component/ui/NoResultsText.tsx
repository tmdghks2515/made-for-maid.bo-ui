export default function NoResultsText({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <p className="text-muted text-sm text-center">{children}</p>
    </div>
  )
}
