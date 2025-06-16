
import { SidebarDashboard } from "./_components/sidebar/page";

export default function DashboardLayout(
{children} : {children : React.ReactNode}
){
  return(
    <>
    <SidebarDashboard>
      {children}
    </SidebarDashboard>
    </>
  );
}