"use client"

import { Button } from "@/components/ui/button";
import type { TimeSlot } from "./schedule-content";
import { cn } from "@/lib/utils";
import { isSlotInThePass, isSlotSequenceAvailable, isToday } from "./schedule.utils";

interface ScheduleTimeListProps {
  selectedDate: Date;
  selectedTime: string;
  requiredSlots: number;
  blockedTimes: string[];
  availableTimeSlots: TimeSlot[];
  clinicTimes: string[];
  onSelectTime: (time: string) => void;
}

export function ScheduleTimeList({ selectedDate, selectedTime, requiredSlots,
  blockedTimes, availableTimeSlots, clinicTimes, onSelectTime }: ScheduleTimeListProps) {

    const dateIsToday = isToday(selectedDate);

  return (
    <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
      {availableTimeSlots.map((slot) => {

        const slotIsPast = dateIsToday && isSlotInThePass(slot.time)
        const sequenceOK = isSlotSequenceAvailable(
          slot.time,
          requiredSlots,
          clinicTimes,
          blockedTimes,

        )

        const slotEnable = slot.available && sequenceOK && !slotIsPast
        return (
          <Button
            onClick={() => slotEnable && onSelectTime(slot.time)}
            type="button"
            variant="outline"
            key={slot.time}
            className={cn("h-10 select-none", selectedTime === slot.time && "border-2 border-emerald-700 text-txtsecundary",
              !slotEnable && "opacity-50 cursor-not-allowed border-red-600",
              slotIsPast === true && "border-red-600 cursor-not-allowed"
            )}
            disabled={!slotEnable}
          >
            {slot.time}
          </Button>
        )

      })}

    </div>
  )
}