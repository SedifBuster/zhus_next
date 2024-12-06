"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { UseFormReturn } from "react-hook-form";
import { ru } from "date-fns/locale";

export function DateTimePicker(
  {
    form
  }: {
    form: UseFormReturn<
      {
        name: string;
        date: Date;
        department: string;
        place: string;
        event: string;
        circs: string;
        gauge: string;
        note: string;
        liable: string;
        cause: string;
      }, any, undefined
    >
  }
) {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState<string>("05:00");
  const [date, setDate] = useState<Date | null>(null);

  return <FormField
    control={form.control}
    name="date"
    render={({ field }) => (
      <FormItem className="flex flex-col pt-2">
        <FormLabel className="pb-0.5">Выберите время*</FormLabel>
        <FormControl>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[320px] justify-start text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (format(field.value, "PPP", {locale: ru}))  : <span>Выберите время*</span>}  {time}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
                locale={ru}
              />
              <Select
                defaultValue={time!}
                onValueChange={(e) => {
                  setTime(e);
                  if (date) {
                    const [hours, minutes] = e.split(":");
                    const newDate = new Date(date.getTime());
                    newDate.setHours(parseInt(hours), parseInt(minutes));
                    setDate(newDate);
                    field.onChange(newDate);
                  }
                }}
                open={true}
              >
              <SelectTrigger className="font-normal focus:ring-0 w-[120px] my-4 mr-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-none shadow-none mr-2 fixed top-2 left-0">
                <ScrollArea className="h-[15rem]">
                  {Array.from({ length: 96 }).map((_, i) => {
                    const hour = Math.floor(i / 4)
                      .toString()
                       .padStart(2, "0");
                    const minute = ((i % 4) * 15)
                      .toString()
                      .padStart(2, "0");
                    return (
                      <SelectItem key={i} value={`${hour}:${minute}`}>
                        {hour}:{minute}
                      </SelectItem>
                    );
                  })}
                </ScrollArea>
              </SelectContent>
              </Select>
            </PopoverContent>
          </Popover>
        </FormControl>
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverContent
                  className="w-auto p-0 flex items-start"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={date || field.value}
                    onSelect={(selectedDate) => {
                      const [hours, minutes] = time?.split(":")!;
                      selectedDate?.setHours(
                        parseInt(hours),
                        parseInt(minutes)
                      );
                      setDate(selectedDate!);
                      field.onChange(selectedDate);
                    }}
                    onDayClick={() => setIsOpen(false)}
                    fromYear={2000}
                    toYear={new Date().getFullYear()}
                    disabled={(date) =>
                      Number(date) < Date.now() - 1000 * 60 * 60 * 24 ||
                      Number(date) > Date.now() + 1000 * 60 * 60 * 24 * 30
                    }
                  />
                  
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
}