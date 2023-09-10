import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { getApiLimit } from "@/lib/api-limit";

const DashboardLayout = async ({
  children
 } : {
  children: React.ReactNode
 }) => {

  const apiLimitCount = await getApiLimit();

  return (
    <div className="h-full relative">
      <div className="hidden h-screen md:flex md:flex-col md:inset-y-0 md:fixed bg-gray-900 md:w-72">
        <SideBar apiLimitCount={apiLimitCount}/>
      </div>
      <main className="md:pl-72">
        <Navbar/>
        {children}
      </main>
    </div>

  )
}

export default DashboardLayout;