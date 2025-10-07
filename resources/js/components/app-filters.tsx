import { SearchIcon } from 'lucide-react';
import { ChangeEvent, useId } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type FiltersProps = {
    valuePost: string;
    valueSelect: string
    onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSelectFilterChange: (value:string) =>void;
};

function IndexFilters({ valuePost, valueSelect, onFilterChange, onSelectFilterChange }: FiltersProps) {
    const idSelect = useId();
    const idFilterPost = useId();
    // const idFilterCommt = useId();
    // console.log(valueSelect)
    return (
        <header className="mt-4 flex max-h-20 w-full items-center justify-between gap-2.5 p-1">
            <div className='flex gap-3'>
                <div className="flex items-center gap-1.5">
                    <Label htmlFor={idFilterPost} className="text-md">
                        Buscar Datos:
                    </Label>
                    <div className="relative">
                        <Input
                            onChange={onFilterChange}
                            value={valuePost}
                            name="search_post"
                            autoFocus
                            id={idFilterPost}
                            className="peer w-96 ps-9"
                            placeholder="Buscar..."
                            type="search"
                        />
                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                            <SearchIcon size={16} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1.5">
                <Label htmlFor={idSelect} className="text-md">
                    Ordernar por:
                </Label>
                <Select onValueChange={onSelectFilterChange} value={valueSelect} >
                    <SelectTrigger id={idSelect} tabIndex={2} className="w-40 gap-1.5 whitespace-nowrap">
                        <SelectValue placeholder="Selecciona Opción" />
                    </SelectTrigger>
                    <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                        <SelectItem value="default">Defecto</SelectItem>
                        <SelectItem value="contrato">Nro. Contrato</SelectItem>
                        <SelectItem value="fecha">Fecha Contrato</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </header>
    );
}

export default IndexFilters;
