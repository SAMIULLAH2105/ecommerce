import { ChartNoAxesCombined } from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import {
  CalendarArrowDown,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <CalendarArrowDown />,
  },
];

function MenuItems({setOpen}) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div key={menuItem.id} className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={() => {
            navigate(menuItem.path);
            // below is for on click of any item it will close sidebar
            setOpen ? setOpen(false) :null
          }}
        >
          {menuItem.icon}
          <span>{menuItem.label}</span> 
        </div>
      ))}
    </nav>
  );
}

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      {/* sheet component for menu for small devices */}
      <Sheet open={open} onOpenChange={setOpen}>


        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
                <SheetTitle className="flex gap-2 mt-5 mb-4">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin panel</h1>
                </SheetTitle>
            </SheetHeader>

            <MenuItems setOpen={setOpen}/>

          </div>

        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          className="flex cursor-pointer gap-2"
          onClick={() => {
            navigate("/admin/dashboard");
          }}
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin panel</h1>
        </div>

        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
