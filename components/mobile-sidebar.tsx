"use client"

import { Menu,AlignJustify } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "./sidebar";
import { useEffect, useState } from "react";

const MobileSidebar = () => {
  const [isMounted, setIsMounted ] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  },[])


  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger>

      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SideBar />
      </SheetContent>
    </Sheet>

    );
}

export default MobileSidebar;