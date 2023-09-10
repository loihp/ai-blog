"use client"

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import { Code, Loader } from "lucide-react";
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
import ReactMarkdown from "react-markdown";
import { toast } from "react-hot-toast";

const CodePage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form  = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    }
  });

  const isLoading =  form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessage = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessage,
      });

      setMessages((current) => [...current, userMessage, response.data])

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
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
        title="Code"
        description="Generate code using descriptive text."
        icon={Code}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
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
                        placeholder="How to create a button in HTML?"
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
          {messages.length === 0 && !isLoading && (
            <Empty label={"No code started."} />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn("p-8 w-full flex items-center gap-x-8 rounded-lg", message.role === "user" ? "bg-violet-500/10 justify-end" : "bg-muted")}
              >
                {message.role !== "user" && <BotAvatar />}
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="text-sm bg-black/10 rounded-lg p-1" {...props} />
                    )
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {message.content}
                </ReactMarkdown>
                {message.role === "user" && <UserAvatar />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
   );
}

export default CodePage;