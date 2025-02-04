import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-6 text-sm">
      {menuItems.map((menu) => (
        <div className="flex flex-col gap-3" key={menu.title}>
          <span className="hidden lg:block text-gray-400 font-medium tracking-wider text-xs my-4 px-4">
            {menu.title}
          </span>
          {menu.items.map(
            (item) =>
              item.visible.includes(role) && (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-600 py-3 md:px-4 rounded-xl transition-all duration-300 hover:bg-gray-100/80 hover:shadow-sm hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    src={item.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="transition-all duration-300 group-hover:brightness-90 group-active:brightness-75 relative z-10"
                  />
                  <span className="hidden lg:block font-medium relative z-10 group-hover:translate-x-0.5 transition-transform duration-300">
                    {item.label}
                  </span>
                </Link>
              )
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;