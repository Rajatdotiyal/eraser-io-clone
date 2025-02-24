import { FileListContext } from "@/app/_context/FileListContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { MoreHorizontal, Trash2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

export interface FILE {
  archive: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _creationTime: number;
  _id: string;
}

function FileList() {
  const { fileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<FILE[]>([]);
  const { user }: any = useKindeBrowserClient();
  const router = useRouter()
  const deleteData = useMutation(api.files.deleteFilesById)

  useEffect(() => {
    fileList_ && setFileList(fileList_);
  }, [fileList_]);

  const handleDelete = async (e: React.MouseEvent, id: Id<"files">) => {
    e.stopPropagation();
    await deleteData({ _id: id })
      .then(() => {setFileList((prev) => prev.filter((file) => file._id !== id));
        toast.success("File deleted successfully");})
      .catch(() => toast.error("Something went wrong"));
  };

  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                File Name
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Created At
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Edited
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Author
              </td>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {fileList.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10">
                  <span className="text-gray-500">Create a new file</span>
                </td>
              </tr>
            ) : (
              fileList.map((file, index) => (
                <tr
                  onClick={() => router.push(`/workspace/${file._id}`)}
                  key={index}
                  className="cursor-pointer odd:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {file.fileName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(file._creationTime).format("DD MMM YYYY")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(file._creationTime).format("DD MMM YYYY")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {user?.picture && (
                      <Image
                        src={user?.picture}
                        alt="user"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <DropdownMenu>
                      <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                        <DropdownMenuItem
                          onClick={(e) => handleDelete(e, file._id as Id<"files">)}
                          className="gap-3"
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FileList;