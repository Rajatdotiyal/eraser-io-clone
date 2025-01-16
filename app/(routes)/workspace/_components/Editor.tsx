"use client";

import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import EditorjsList from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { FILE } from "../../dashboard/_components/FileList";

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name", 
        level: 2,
      },
      id: "123",
      type: "header",
    },
    {
      data: {
        text: "Subheading", 
        level: 4,
      },
      id: "1234",
      type: "header",
    },
  ],
  version: "2.8.1",
};

export interface EditorProps{
  onSaveTrigger : boolean,
  fileData? : FILE
}

function Editor({onSaveTrigger,fileData} : EditorProps) {
  const ref = useRef<EditorJS>(null);
  const updateDocument = useMutation(api.files.updateDocument);
  useEffect(() => {
    fileData&&initEditor();
  }, [fileData]);

const params = useParams();
  useEffect(()=>{
    onSaveTrigger && onSaveDocument()
  },[onSaveTrigger])

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: {
          class: Header as unknown as EditorJS.ToolConstructable,
          shortcut: "CMD+SHIFT+H",
          config: {
            placeholder: "Enter Heading",
            levels: [1, 2, 3],
            defaultLevel: 1,
          },
        },
        list: {
          class: EditorjsList as unknown as EditorJS.ToolConstructable,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        paragraph: {
          class: Paragraph as unknown as EditorJS.ToolConstructable,
          inlineToolbar: true,
        },
      },
      data :  fileData?.document ? JSON.parse(fileData.document) : rawDocument
    });
    ref.current = editor;
  };

  const onSaveDocument =() =>{
    if(ref.current){
      ref.current.save().then((outputData) => {
        
       
        updateDocument({
          _id: params.fileId as Id<"files"> ,
          document : JSON.stringify(outputData)
        }).then((res)=>{
            toast.success("Document saved ")
          
        })
      }).catch(() => {
        toast.error("Server Error")
      });
    }
  }

  return (
    <div>
      <div id="editorjs" className="ml-14"></div>
    </div>
  );
}

export default Editor;
