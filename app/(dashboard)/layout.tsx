import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";

const DashboardLayout = ({
  children
 } : {
  children: React.ReactNode
 }) => {
  return (
    <div className="h-full relative">
      <div className="hidden h-screen md:flex md:flex-col md:inset-y-0 md:fixed z-[80] bg-gray-900 md:w-72">
        <SideBar className="h-full"/>
      </div>
      <main className="md:pl-72">
        <Navbar/>
        {children}
      </main>
    </div>

  )
}

export default DashboardLayout;