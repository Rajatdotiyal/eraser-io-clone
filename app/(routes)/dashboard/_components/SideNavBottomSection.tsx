import { Button } from "@/components/ui/button";
import { Archive, Flag, Github } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function SideNavBottomSection({onFileCreate}:any) {
  const [fileInput, setFileInput] = useState("");

  const menuList = [
    {
      id: 1,
      name: "Getting Started",
      icon: Flag,
      path: "https://www.eraser.io/use-case/documentation",
    },
    {
      id: 2,
      name: "Github",
      icon: Github,
      path: "https://github.com/Rajatdotiyal/eraser-io-clone",
    },
    {
      id: 3,
      name: "Archive",
      icon: Archive,
      path: "",
    },
  ];
  return (
    <div>
      {menuList.map((menu, index) => (
        <a 
        href={menu.path}
          key={index}
          className="flex gap-2 p-1 px-2 text-[14px] hover:bg-gray-100 rounded-md cursor-pointer"
        >
          <menu.icon className="h-5 w-5" />
          {menu.name}
        </a>
      ))}
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button className="w-full bg-blue-600 hover:bg-blue-700  mt-3 ">
            New File
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new file</DialogTitle>
            <DialogDescription>
              <Input
                placeholder="Enter file name"
                className="mt-3"
                onChange={(e) => setFileInput(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!(fileInput && fileInput.length > 0)}
                onClick={()=>onFileCreate(fileInput)}
              >
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SideNavBottomSection;
