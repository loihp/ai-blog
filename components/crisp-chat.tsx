"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

export const CrispChat = () => {
  useEffect(() =>{
    Crisp.configure("88f23174-b939-4010-a531-e57de72113b9");
  },[]);

  return null;
}