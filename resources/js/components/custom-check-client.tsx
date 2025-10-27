import { useState } from "react"
import { BookmarkIcon, CheckSquareIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function CheckBoxClient() {
  const [checked, setChecked] = useState<boolean>(false)
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              className="group size-9 p-0 cursor-pointer hover:bg-indigo-50 hover:text-green-500 data-[state=on]:bg-indigo-50 data-[state=on]:text-green-500"
              aria-label="Bookmark this"
              pressed={checked}
              onPressedChange={setChecked}            
            >
              <CheckSquareIcon size={16} aria-hidden="true" />
            </Toggle>
          </div>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">
          <p>{checked ? "No Autorizar" : "Autorizar"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

