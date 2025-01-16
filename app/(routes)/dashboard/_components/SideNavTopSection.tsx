import { ChevronDown, LayoutGrid, LogOut, LucideIcon, Settings, Users } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}
export interface MenuItem {
    id: number;
    name: string;
    path: string;
    icon: LucideIcon; 
  }
function SideNavTopSection({ user,setActiveTeamInfo }: any ) {
  const [teamList, setTeamList] = useState<TEAM[]>();
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const router = useRouter();
  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: Users,
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
    },
  ];
  function capitalizeFirstLetter(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
  const convex = useConvex();

  useEffect(() => {
    user && getTeamList();
  }, [user]);


  useEffect(()=>{
    activeTeam && setActiveTeamInfo(activeTeam)
  },[activeTeam])

  const getTeamList = async () => {
    const result = await convex.query(api.teams.getTeam, { email: user.email });
    setTeamList(result);
    setActiveTeam(result[0]);
  };

  const onMenuClick = (item  :MenuItem) =>{
    if(item.path){
        router.push(item.path)
    }
  }
  return (
    <div>
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-3 hover:bg-slate-200 p-3 rounded-lg cursor-pointer">
          <Image src="/logo-1.png" width={40} height={40} alt="eraser" />
          <h2 className="flex gap-2 items-center font-bold text-[17px]">
            {activeTeam?.teamName}
            <ChevronDown />
          </h2>
        </div>
      </PopoverTrigger>
      <PopoverContent className="ml-7 p-4">
        <div>
          <div>
            {teamList?.map((team, index) => (
              <h2
                className={`p-2 hover:bg-blue-500 hover:text-white rounded-lg mb-1 cursor-pointer ${activeTeam?._id === team._id && "bg-blue-500 text-white"} `} onClick={()=>setActiveTeam(team)}
                key={index}
              >
                {team.teamName}
              </h2>
            ))}
          </div>
          <Separator className="mt-2 bg-slate-100" />
        </div>

        <div>
          {menu.map((item, index) => (
            <h2
              key={index}
              className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg text-sm cursor-pointer"
             onClick={()=>onMenuClick(item)}>
              <item.icon className="h-4 w-4" />
              {item.name}
            </h2>
          ))}

          <LogoutLink>
            <h2 className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg text-sm cursor-pointer">
              <LogOut className="h-4 w-4" />
              Logout{" "}
            </h2>
          </LogoutLink>
        </div>
        <Separator className="mt-2 bg-slate-100" />
        {user && (
          <div className="mt-2 flex items-center gap-2">
            <Image
              src={user.picture}
              alt="user"
              width={30}
              height={30}
              className="rounded-full"
            />
            <div>
              <h2 className="text-[14px] font-bold">
                {capitalizeFirstLetter(user.given_name)}{" "}
                {capitalizeFirstLetter(user.family_name)}
              </h2>
              <h2 className="text-[12px] text-gray-500">
                {capitalizeFirstLetter(user.email)}
              </h2>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>

    <Button variant='outline'  className="w-full justify-start gap-2 font-bold mt-8 bg-gray-100">
        <LayoutGrid className="h-5 w-5"/> All Files
    </Button>
    </div>
  );
}

export default SideNavTopSection;
