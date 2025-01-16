'use client'

import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import Editor from '../_components/Editor'
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import { FILE } from '../../dashboard/_components/FileList';
import Canvas from '../_components/Canvas';

function Workspace() {
  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const params = useParams();
  const [fileName, setFileName] = useState('');
  const [fileData, setFileData] = useState<FILE | undefined>(undefined);

  useEffect(() => {
    params.fileId && getFileData();
  }, [params.fileId]);

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, { _id: params.fileId as Id<'files'> });
    setFileData(result);
    setFileName(result.fileName);
  };

  return (
    <div className="h-screen flex flex-col">
      <WorkspaceHeader fileName={fileName} onSave={() => setTriggerSave(!triggerSave)} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 flex-grow">
        <div className="h-full">
          <Editor onSaveTrigger={triggerSave} fileData={fileData} />
        </div>
        <div className="h-full border-l">
          <Canvas onSaveTrigger={triggerSave} fileData={fileData} />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
