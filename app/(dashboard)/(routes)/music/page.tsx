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
import { ChatCompletionRequestMessage } from "openai";
import Empty from "@/components/empty";
import Loading from "@/components/loading";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import { toast } from "react-hot-toast";
import { useProModal } from "@/hooks/use-pro-modal";

const MusicPage = () => {
  // const proModal = useProModal();
  const router = useRouter();
  const [music, setMusic] = useState<string>();
  const form  = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    }
  });

  const isLoading =  form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", values);

      setMusic(response.data.audio);

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
        title="Music"
        description="Turn your prompt into a song.s"
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
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
                        placeholder="Piano solo"

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
          {!music && !isLoading && (
            <Empty label={"No music started."} />
          )}
          {music && (
            <audio controls className="w-full mt-8 ">
              <source src={music}/>
            </audio>
          )}
        </div>
      </div>
    </div>
   );
}

export default MusicPage;