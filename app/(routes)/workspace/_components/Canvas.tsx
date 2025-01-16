'use client'
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { FILE } from "../../dashboard/_components/FileList";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export interface CanavsProps{
  onSaveTrigger : boolean,
  fileData? : FILE
}

function Canvas({onSaveTrigger,fileData}: CanavsProps) {

  const [whitboardData,setWhiteboardData] = useState<any>();

  const updateWhiteboard = useMutation(api.files.updateWhiteboard)


  const params = useParams();

  useEffect(()=>{
    onSaveTrigger && saveWhiteboard()
  },[onSaveTrigger])
  const saveWhiteboard = () =>{
    updateWhiteboard({
      _id : params.fileId as Id<"files"> ,
       whiteboard :JSON.stringify(whitboardData) 
    })
  }
  return (
    <div className="h-full ">
  {fileData &&<Excalidraw onChange={(excalidrawElements, appState, files)=> setWhiteboardData(excalidrawElements)}
    UIOptions={{
      canvasActions : {
        saveToActiveFile : false,
        loadScene : false,
        export : false,
        toggleTheme : false,
        
      }
    }} initialData={{
      elements : fileData.whiteboard && JSON.parse(fileData?.whiteboard),
    }} >

      <MainMenu>
        <MainMenu.DefaultItems.ClearCanvas/>
        <MainMenu.DefaultItems.SaveAsImage/>
        <MainMenu.DefaultItems.ChangeCanvasBackground/>
      </MainMenu>
      <WelcomeScreen>
        <WelcomeScreen.Hints.MenuHint/>
        <WelcomeScreen.Hints.HelpHint/>
        <WelcomeScreen.Hints.ToolbarHint/>
      </WelcomeScreen>
    </Excalidraw>
    }  
  </div>
  )
}

export default Canvas