import { SidebarInset,SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarWrapper } from "@/module/dashboard/component/sidebar-wrapper";
import { AppSidebar } from "@/module/dashboard/component/app-sidebar";
import AppHeader from "@/module/dashboard/component/app-header";

const AdminLayout =({children}:{children:React.ReactNode})=>{
    return (
        <SidebarWrapper>
            <AppSidebar />
              <SidebarInset>
               <AppHeader/>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {children}
                </div>
           </SidebarInset>
        </SidebarWrapper>
    )
}
export default AdminLayout