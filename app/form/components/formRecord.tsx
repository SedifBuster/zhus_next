'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
    department: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    date: z.date(),
    place: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    event: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
    circs: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
    gauge: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
    note: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
    liable: z.string().min(2, {
      message: "Username must be at least 2 characters.",
      }),
      cause: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
  })

export
  default function FormRecord(
) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        department: "",
        name: "",
        date: new Date(),
        place: "",
        event: "",
        circs: "",
        gauge: "",
        note: "",
        liable: "",
        cause: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ф.И.О. пациента*</FormLabel>
                <FormControl>
                  <Input placeholder="Иванов И.И." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="place"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Место нежелательного события*</FormLabel>
                <FormControl>
                  <Input placeholder="Неврологическое отделение, палата 1334" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="event"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Вид нежелательного события*</FormLabel>
                <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                     <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                     <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="circs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Причина возникновения нежелательного события*</FormLabel>
                <FormControl>
                  <Textarea placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="gauge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание обстоятельств, при которых произошло нежелательное событие*</FormLabel>
                <FormControl>
                <Textarea placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Принятые меры по устранению последствий нежелательного события*</FormLabel>
                <FormControl>
                <Textarea placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="liable"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Примечание</FormLabel>
                <FormControl>
                <Textarea placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="cause"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Отвественный*</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <Button type="submit">Отправить</Button>
        </form>
      </Form>
    </section>
  )
}