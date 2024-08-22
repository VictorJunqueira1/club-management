"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full",
        month: "space-y-4 w-full",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-xl font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-4",
        head_row: "flex w-full",
        head_cell:
          "text-slate-500 rounded-md w-8 font-normal text-[0.8rem] dark:text-slate-400 w-full",
        row: "flex w-full mt-10",
        cell: cn(
          "relative w-full p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected])]:bg-blue-800 dark:[&:has([aria-selected].day-outside)]:bg-blue-800/50",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-blue-600 text-white hover:bg-blue-500 hover:text-white focus:bg-blue-200 focus:text-black dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600 dark:hover:text-white dark:focus:bg-blue-600 dark:focus:text-white",
        day_today: "bg-blue-100 text-blue-900 dark:bg-blue-500 dark:text-blue-200",
        day_outside:
          "day-outside text-slate-500 opacity-70 aria-selected:bg-slate-200 aria-selected:text-slate-500 aria-selected:opacity-50 dark:text-slate-400 dark:aria-selected:bg-slate-800 dark:aria-selected:text-blue-400",
        day_disabled: "text-blue-500 opacity-50 dark:text-red-400",
        day_range_middle:
          "aria-selected:bg-blue-200 aria-selected:text-blue-900 dark:aria-selected:bg-blue-500 dark:aria-selected:text-white",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }