import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-sm rounded-full bg-gray-100 px-4 py-2">
        <Image src="/search.png" alt="" width={16} height={16} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] bg-transparent outline-none"
        />
      </div>

      {/* ICONS AND USER */}
      <div className="flex items-center gap-4 justify-end">
        <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
          <Image src="/mail.png" alt="" width={18} height={18} />
        </div>
        <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors relative">
          <Image src="/announcement.png" alt="" width={18} height={18} />
          <div className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
            1
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">User</span>
          <span className="text-xs text-gray-500">Admin</span>
        </div>
        <Image
          src="/avatar.png"
          alt=""
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;