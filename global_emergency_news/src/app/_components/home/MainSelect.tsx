// src\app\_components\home\MainSelect.tsx
'use client';

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";

interface Props{
    addClass: string,
    placeholder: string,
    options: string[],

}

export function MainSelect({addClass, options, placeholder}: Props){
    const [language, setLanguage] = useState("")
    return(
        <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger
                className={`${addClass} focus:outline-none !ring-0 !border-transparent 
                        focus:ring-0 focus:border-transparent bg-[#F2E8E8] rounded-[8px] md:text-[14px] text-[12px] font-semibold `}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {
                    options.map((option, index) => (
                        <SelectItem value={option} key={index}>
                            {option}
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>

    )
}


