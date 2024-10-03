import { RiHomeGearLine } from "react-icons/ri";
import { MdChecklist } from "react-icons/md";
import { LuFileSpreadsheet } from "react-icons/lu";
import { MdOutlineCreate } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const sidebarItems = [
    {
      text: "Dashboard",
      link: "/admin/allProducts",
      icon: <RiHomeGearLine />
    },
    {
      text: "Products",
      link: "/admin/allProducts",
      icon: <MdChecklist />
    },
    {
      text: "Create",
      link: "/admin/create-product",
      icon: <MdOutlineCreate />
    },
    {
      text: "Orders",
      link: "/admin/appProducts",
      icon: <LuFileSpreadsheet />
    },
    {
      text: "Rates",
      link: "/admin/appProducts",
      icon: <LuFileSpreadsheet />
    }
  ];
  return (
    <div className="w-full h-full overflow-auto">
      <div className="border-2  border-yellow-300">
        <ul className="w-[90%] flex flex-col space-y-5 p-5 font-semibold text-muted-foreground font-sans tracking-widest	">
          {
            sidebarItems.map((item) => (
              <li key={item.text}>
                <Link to={item.link}>
                  <div className="flex items-center justify-items-start space-x-3">
                    <div >
                      {item.icon}
                    </div>
                    <h3>{item.text}</h3>
                  </div>
                </Link>
              </li>
            ))
          }
        </ul>
        
      </div>
    </div>
  );
};

export default Sidebar;
