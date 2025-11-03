'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const sucursales = [
    {
        value: '5ta y 92',
        label: 'Sucursal 5ta y 92',
    },
    {
        value: '3ra y 18',
        label: 'Sucursal 3ra y 18',
    },
    {
        value: 'matanzas',
        label: 'Sucursal Matanzas',
    },
    {
        value: 'santa clara',
        label: 'Sucursal Santa Clara',
    },
    {
        value: 'cienfuegos',
        label: 'Sucursal Cienfuegos',
    },
];
type propCombox = {
    valueCombox: string | undefined;
    handleSelect: (val: string) => void;
};

export function ComboBoxSuc({ handleSelect, valueCombox }: propCombox) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    console.log(valueCombox);

    const valueFind = sucursales.find((sucursal) => sucursal.value === value)?.label

    // const editSucursal = (value:string|undefined)=> {
    //     if (value) {
    //         const valueFind = sucursales.find((item) =>item.value===value);
    //         return valueFind?.value
    //     }
    // }

    const handleOnSelect = (currentValue: string) => {
        const newValue = currentValue === value ? '' : currentValue;        
        setValue(newValue);
        handleSelect(newValue);
        setOpen(false);
        // setValue(newValue)
        // setOpen(false);
    };

    return (
        <Popover modal open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild tabIndex={4}>
                <Button variant="outline" role="combobox" aria-expanded={open} className="col-span-2 w-full justify-between">
                    {value ? sucursales.find((sucursal) => sucursal.value === value)?.label : 'Selecciona la Sucursal...'}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Buscar Sucursal..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>Sucursal no encontrada.</CommandEmpty>
                        <CommandGroup>
                            {sucursales.map((sucursal) => (
                                <CommandItem key={sucursal.value} value={sucursal.value } onSelect={handleOnSelect}>
                                    {sucursal.label}
                                    <Check className={cn('ml-auto', value === sucursal.value ? 'opacity-100' : 'opacity-0')} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
