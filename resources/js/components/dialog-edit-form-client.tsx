import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { format } from 'date-fns';
// import { CalendarIcon } from 'lucide-react';
import { ChangeEvent, FormEvent, useId, useState } from 'react';
// import { Calendar } from './ui/calendar';
// import InputError from './input-error';
import { PostData } from '@/types';
import { useForm } from '@inertiajs/react';
import { EditIcon, MinusIcon, PlusIcon } from 'lucide-react';
import InputDateCliente from './calendar-form-client';
import InputError from './input-error';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { toast } from 'sonner';
// import { Tooltip, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export function DialogEditFormClient({ postClient }: { postClient: PostData }) {
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const id = useId();
    const { name_p, nro_contract, date_contract, comments } = postClient;

    const initialComments = comments.map((item) => {
            return {
                id: item.id || null,
                name_w: item.name_c,
                ci_w: item.nro_ident,
            };
        });

    const {
        data,
        setData,
        errors,
        put,
        clearErrors,
        processing,
        reset,
    } = useForm({
        nro_c: nro_contract,
        name_c: name_p,
        fecha_c: new Date(date_contract),
        workers: initialComments,
    });
    // const initialData = useRef(data)

    const onChangeDate = (date: Date | undefined) => {
        if (date !== undefined) {
            setData('fecha_c', date);
        }
        setOpen(false);
    };
    const handleAddWorker = () => {
        const newWorker = { id: null, name_w: '', ci_w: '' };
        const addWorker = [...data.workers, newWorker];
        setData('workers', addWorker);
    };

    const handleRemoveWorker = (item: { id: number | null; name_w: string; ci_w: string }, i : number) => {
        const newList = data.workers.filter((_,index) => index !==i);
            console.log(postClient.id, '-', item, ' Nuevo');
            setData('workers', newList);
      
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, i = -1) => {
        const name_inpt = e.target.name;
        const value_inpt = e.target.value;
        if (name_inpt === 'nro_c' && value_inpt !== ' ') return setData('nro_c', value_inpt);
        if (name_inpt === 'name_c' && value_inpt !== ' ') return setData('name_c', value_inpt);

        const newWorker = [...data.workers];

        if (name_inpt === `workers.${i}.name_w` && value_inpt !== ' ') {
            newWorker[i].name_w = value_inpt;
            return setData('workers', newWorker);
        }
        if (name_inpt === `workers.${i}.ci_w` && value_inpt !== ' ') {
            newWorker[i].ci_w = value_inpt;
            return setData('workers', newWorker);
        }
    };
    const handleResetForm = ()=>{
        const newState = !openDialog
        if (newState==false){    
            reset('nro_c', 'name_c');
            setData('workers', initialComments);
            // setData('workers', [{
            //     name_w: '',
            //     ci_w: '',
            // }]);
            clearErrors();           
        }
        setOpenDialog(newState)        
    }   
    const handleEditSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('admin.post.update', postClient.id), {
            preserveScroll: true,
            // preserveUrl:true,
           onSuccess : ()=>{
                handleResetForm();
                toast.success('Cliente Actualizado Correctamente')
            },
            onError: (errors)=>{toast.error(errors.error || 'Error Actualizando el Cliente')},
        });
    };

    return (
        <Dialog open={openDialog} onOpenChange={handleResetForm}>
            <DialogTrigger asChild>
                <Button
                    variant={'default'}
                    className="h-8 w-8 cursor-pointer bg-blue-500 transition-transform hover:scale-110 hover:bg-blue-600 hover:opacity-80"
                >
                    <EditIcon color="white" className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent
                className="lg:max-w-lg"
                onInteractOutside={(e) => e.preventDefault()}
                // onEscapeKeyDown={() => resetAndClearErrors()}
            >
                <div className="flex flex-col items-center gap-2">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full border" aria-hidden="true">
                        <svg
                            className="stroke-zinc-800 dark:stroke-zinc-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                        >
                            <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
                        </svg>
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">Actualizar Datos del Cliente</DialogTitle>
                        <DialogDescription className="sm:text-center">Introduzca los nuevos datos del Cliente </DialogDescription>
                    </DialogHeader>
                </div>

                <form onSubmit={handleEditSubmit} className="space-y-5 pt-4">
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <div className="*:not-first:mt-2">
                                <Label htmlFor={`${id}-contrato`}>Nro. Contrato <span className='text-red-600'>*</span></Label>
                                <Input
                                    id={`${id}-contrato`}
                                    name="nro_c"
                                    placeholder="####..."
                                    onChange={handleChange}
                                    type="text"
                                    value={data.nro_c}
                                />
                                <InputError message={errors['nro_c']} />
                            </div>
                            <InputDateCliente
                                selected={data.fecha_c}
                                onSelect={onChangeDate}
                                isOpen={open}
                                onOpenChange={setOpen}
                                placeholder="Seleccione la fecha"
                            />
                            <InputError message={errors['fecha_c']} />
                        </div>
                        <div className="*:not-first:mt-2">
                            <Label htmlFor={`${id}-name`}>Nombre del Cliente <span className='text-red-600'>*</span></Label>
                            <Input
                                id={`${id}-name`}
                                name="name_c"
                                placeholder="Alex TCP ..."
                                type="text"
                                onChange={handleChange}
                                value={data.name_c}
                            />
                            <InputError message={errors['name_c']} />
                        </div>
                        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                            <span className="text-xs text-muted-foreground">Trabajador/es</span>
                        </div>
                        {data.workers.map((item, index) => {
                            const errorWorkerName = errors[`workers.${index}.name_w`];
                            const errorWorkerCi = errors[`workers.${index}.ci_w`];
                            // const isErrorWorker = errorWorkerName || errorWorkerCi ? true : false;
                            return (
                                <div key={index} className="flex gap-2">
                                    <div className="grow *:not-first:mt-2">
                                        <Label htmlFor={`${id}-name-${index}`}>Nombre Trabajador <span className='text-red-600'>*</span></Label>
                                        <Input
                                            id={`${id}-name-${index}`}
                                            placeholder="Alberto Perez"
                                            name={`workers.${index}.name_w`}
                                            type="text"
                                            onChange={(e) => handleChange(e, index)}
                                            value={item.name_w}
                                        />

                                        <InputError message={errorWorkerName} />
                                    </div>
                                    <div className="w-32 *:not-first:mt-2">
                                        <Label htmlFor={`${id}-ci-${index}`}>Nro.Identificación <span className='text-red-600'>*</span></Label>
                                        <Input
                                            id={`${id}-ci-${index}`}
                                            placeholder="#####..."
                                            name={`workers.${index}.ci_w`}
                                            type="text"
                                            onChange={(e) => handleChange(e, index)}
                                            value={item.ci_w}
                                            maxLength={11}
                                        />
                                        <InputError message={errorWorkerCi} />
                                    </div>
                                    <div className="mt-8">
                                        <TooltipProvider delayDuration={700}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        id={`${index}`}
                                                        variant={index >= 1 ? 'destructive' : 'default'}
                                                        type="button"
                                                        size="icon"
                                                        aria-label="Add new item"
                                                        className='cursor-pointer'
                                                        onClick={index > 0 ? () => handleRemoveWorker(item, index) : () => handleAddWorker()}
                                                    >
                                                        {index < 1 ? (
                                                            <PlusIcon size={16} aria-hidden="true" />
                                                        ) : (
                                                            <MinusIcon size={16} aria-hidden="true" />
                                                        )}
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent alignOffset={5} className="px-2 py-1 text-xs">
                                                    {index > 0 ? 'Eliminar' : 'Agregar'} Trabajador
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <DialogFooter className="border-t px-6 py-4">
                        <DialogClose asChild>
                            <Button type="button" className="cursor-pointer" variant="outline" onClick={handleResetForm}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing} className="cursor-pointer">
                            {processing ? 'Actualizando' : 'Actualizar'} Datos
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
