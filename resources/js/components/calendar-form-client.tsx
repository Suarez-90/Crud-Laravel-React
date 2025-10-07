import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DateClienteProps {
    selected: Date;
    onSelect: (date: Date | undefined) => void;
    placeholder: string;
    disable?: boolean;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}
export default function InputDateCliente({
    onSelect,
    isOpen,
    selected,
    onOpenChange,
    placeholder = 'Seleccionar fecha',
    disable = false,
}: DateClienteProps) {
    return (
        <div className="*:not-first:mt-2 grow ">
            <Label htmlFor="date" className="px-1">
                Fecha Contrato
            </Label>
            <Popover open={isOpen} onOpenChange={onOpenChange} modal={true}>
                <PopoverTrigger asChild>
                    <Button name='fecha_c' variant="outline" id="date" className="w-full justify-between font-normal" disabled={disable}>
                        {selected ? selected.toLocaleDateString() : placeholder}
                        <CalendarIcon className="size-3.5" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 overflow-hidden p-0" align="start">
                    <Calendar                        
                        mode="single"
                        selected={selected}
                        onSelect={onSelect}
                        className="w-full rounded-md border p-2"
                    />                                    
                </PopoverContent>
            </Popover>
        </div>
    );
}
