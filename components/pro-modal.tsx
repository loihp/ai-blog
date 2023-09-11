"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "./ui/dialog"
import { useProModal } from "@/hooks/use-pro-modal";
import { Card } from "./ui/card";
import { ArrowRight, Code, Image, MessageSquare, Music, Video, Zap } from "lucide-react"
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";

const tools = [
  {
    label: 'Conversation Generation',
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: '/conversation'
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: '/music'
  },
  {
    label: 'Image Generation',
    icon: Image,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: '/image'
  },
  {
    label: 'Video Generation',
    icon: Video,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    href: '/video'
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    href: '/code'
  }
]

export const ProModal = () => {
  const proModal = useProModal();

  const [loading,setLoading] = useState(false);
  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = axios.get("api/stripe");
      console.log(response);
      window.location.href = (await response).data.url;
    } catch (error) {
      console.log(error,"STRIPE_CLIENT_ERROR");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center justify-center flex-col gap-y-4 pb-2">
          <div className="flex gap-x-3">
            <h2 className="font-bold">Upgrade to get more</h2>
            <Badge variant="premium" className="text-sm">Premium</Badge>
          </div>

          {tools.map((tool,index)=>(
            <Card key={index} className="w-full p-4 bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-110 cursor-pointer" onClick={()=> handleBuyPremium() }>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn(tool.color)} size={32} />
                  </div>
                  <h3 className="text-md font-medium">{tool.label}</h3>
                </div>
                <ArrowRight className="text-gray-500" size={24} />
              </div>
            </Card>
          ))}
        </DialogHeader>
        <DialogFooter className="">
          <Button
            disabled={loading}
            onClick={onSubscribe}
            className="w-full"
            size="lg"
            variant="premium"
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-whte"/>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}