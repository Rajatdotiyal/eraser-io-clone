import React, { useContext, useEffect, useState } from "react";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FileListContext";

function SideNav() {
  const createFile = useMutation(api.files.createFile);
  const { user } = useKindeBrowserClient();
  const convex = useConvex();
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const { setFileList_ } = useContext(FileListContext);

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);

   const onFileCreate = (fileName: string) => {
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id || "",
      createdBy: user?.email || "",
      archive: false,
      document: "",
      whiteboard: "",
    })
      .then((res) => {
        if (res) {
          getFiles()
          toast.success("File created succesfully");
        }
      })
      .catch(() => toast.error("Error while creating f"));
  };

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id || "",
    });
    setFileList_(result);
  };

  return (
    <div className=" flex flex-col  h-screen fixed w-72 border-r border-[1px] p-6">
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>
      <div>
        <SideNavBottomSection onFileCreate={onFileCreate} />
      </div>
    </div>
  );
}

export default SideNav;
