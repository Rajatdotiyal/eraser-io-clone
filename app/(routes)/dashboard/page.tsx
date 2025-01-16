"use client";

import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation } from "convex/react";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import FileList from "./_components/FileList";
import Loader from "./_components/Loader";

function Dashboard() {
  const { user }: any = useKindeBrowserClient();
  const [isReady, setIsReady] = useState(false); 

  const convex = useConvex();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user.email });

    if (!result?.length) {
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture,
      });
    }
    setIsReady(true);
  };

  if (!isReady || !user) {
    return <Loader />;
  }

  return (
    <div className="p-8">
      <Header />
      <FileList />
    </div>
  );
}

export default Dashboard;
