import Image from "next/image"

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      {/* Search Bar */}
      <div className="hidden md:flex items-center gap-2 text-xs  rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="" width={14} height={14} />
        <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none"/>
      </div>
      {/* Icons and User */}
      <div className="flex items-center justify-end gap-6 w-full">
        <div className="bg-white rounded-full w-7 h-7 cursor-pointer flex items-center justify-center">
          <Image src="/message.png" alt="" width={20} height={20} />
        </div>
        <div className="bg-white rounded-full w-7 h-7 cursor-pointer flex items-center justify-center relative">
          <Image src="/announcement.png" alt="" width={20} height={20} />
          <div className="bg-purple-500 w-5 h-5 -top-3 rounded-full absolute -right-3 text-xs text-white flex items-center justify-center">1</div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">John Doe</span>
          <span className="text-[10px] text-gray-500 text-right">Admin</span>
        </div>
        <div >
          <Image src="/avatar.png" alt="" width={36} height={36} className="rounded-full cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default Navbar