"use client"

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import { Loader, MessageSquare, Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constant"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Empty from "@/components/empty";
import Loading from "@/components/loading";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import { toast } from "react-hot-toast";
import { useProModal } from "@/hooks/use-pro-modal";

const VideoPage = () => {
  // const proModal = useProModal();
  const router = useRouter();
  const [video, setVideo] = useState<string>();
  const form  = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    }
  });

  const isLoading =  form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post("/api/video", values);

      setVideo(response.data[0]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        // const proModal = useProModal();
      } else {
        toast.error("Something went wrong.")
      }
    } finally {
      router.refresh();
    }
  }

  return (
    <div>
      <Heading
        title="Video"
        description="Turn your prompt into a video"
        icon={Music}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
            className="
              rounded-lg
              border
              w-full
              p-4
              px-3
              md:px-6
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
            "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg-col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-0 focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Battle of the best"

                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2" disabled={isLoading}>Generate</Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 m-4">
          {
            isLoading && (
              <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                {/* <Loader className="animate-spin" size={32} /> */}
                <Loading />
              </div>
            )
          }
          {!video && !isLoading && (
            <Empty label={"No video started."} />
          )}
          {video && (
            <video className="w-full aspect-video mt-8 rounded-lg border bg-black" controls>
              <source src={video}  />
            </video>
          )}
        </div>
      </div>
    </div>
   );
}

export default VideoPage;