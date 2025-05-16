// app/debug-sidebar/page.tsx
import Sidebar from "@/components/ui/sidebar"

export default function DebugSidebarPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-white p-6">
        <p className="text-gray-500">This is a test preview of the sidebar.</p>
      </main>
    </div>
  )
}
