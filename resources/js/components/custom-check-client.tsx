import { CheckSquareIcon, Square } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from './ui/button';

type CheckedData = {
    checked: boolean;
    styleIsChecked: string;
    // setChecked: ()=>void;
};

export default function CheckBoxClient({ checked, styleIsChecked }: CheckedData) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        type="button"
                        variant={'outline'}
                        className={`h-8 w-8 cursor-pointer transition-transform hover:scale-110 hover:bg-indigo-50 hover:text-emerald-600 ${styleIsChecked}`}
                    >
                        {!checked ? <Square className="h-4 w-4" /> : <CheckSquareIcon className="h-4 w-4" />}
                    </Button>                    
                </TooltipTrigger>
                <TooltipContent className="px-2 py-1 text-xs">
                    <p>{checked ? 'No Autorizar' : 'Autorizar'}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
