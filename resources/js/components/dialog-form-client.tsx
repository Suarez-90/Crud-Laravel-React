import { ChangeEvent, FormEvent, useId, useState } from 'react';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useForm } from '@inertiajs/react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import InputDateCliente from './calendar-form-client';
import InputError from './input-error';
import { toast } from 'sonner';

export default function DialogFormCliente() {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const id = useId();

    const { data, setData, errors,  processing, post, reset, clearErrors } = useForm({
        nro_c: '',
        name_c: '',
        fecha_c: new Date(),
        workers: [
            {
                name_w: '',
                ci_w: '',
            },
        ],
    });
    const { nro_c, name_c, fecha_c, workers } = data;

    const handleAddWorker = () => {
        const newWorker = { name_w: '', ci_w: '' };
        setData({ ...data, workers: [...workers, newWorker] });
    };

    const handleRemoveWorker = (i: number) => {
        const newList = workers.filter((_, index) => index !== i);
        setData('workers', newList);
    };

    const onChangeDate = (date: Date | undefined) => {
        if (date !== undefined) {
            setData('fecha_c', date);
        }
        setOpen(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, i = -1) => {
        const name_inpt = e.target.name;
        const value_inpt = e.target.value;
        
        if (name_inpt === 'nro_c' && value_inpt !== ' ') return setData('nro_c', value_inpt);
        if (name_inpt === 'name_c' && value_inpt !== ' ') return setData('name_c', value_inpt);

        const newWorker = [...workers];

        if (name_inpt === `name_w_${i}` && value_inpt !== ' ') {
            newWorker[i]['name_w'] = value_inpt;
            return setData('workers', newWorker);
        }
        if (name_inpt === `ci_w_${i}` && value_inpt !== ' ') {
            newWorker[i]['ci_w'] = value_inpt;
            return setData('workers', newWorker);
        }
    };
    const handleResetForm = ()=>{
        const newState = !openModal
        if (newState==false){    
            reset('nro_c', 'name_c');
            setData('workers', [{
                name_w: '',
                ci_w: '',
            }]);
            clearErrors();           
        }
        setOpenModal(newState);              
    }

    const handleCreateSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('admin.post.store'), {
            preserveScroll: true,
            preserveState:true,
            onSuccess : ()=>{
                handleResetForm();
                toast.success('Cliente Creado Correctamente')
            },
            onError: (errors)=>{toast.error(errors.error || 'Error Creando el Cliente')},
        });        
    };    

    return (
        <Dialog open={openModal} onOpenChange={handleResetForm}>
            <DialogTrigger asChild>
                <Button variant="default">Agregar Cliente</Button>
            </DialogTrigger>
            <DialogContent className="lg:max-w-lg" onInteractOutside={(e)=>e.preventDefault()} onEscapeKeyDown={handleResetForm}>
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
                        <DialogTitle className="sm:text-center">Crear un nuevo Cliente</DialogTitle>
                        <DialogDescription className="sm:text-center">Introduzca los datos correspondiente del Cliente </DialogDescription>
                    </DialogHeader>
                </div>

                <form onSubmit={handleCreateSubmit} className="space-y-5 pt-4">
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <div className="*:not-first:mt-2">
                                <Label htmlFor={`${id}-contrato`}>Nro. Contrato <span className='text-red-500'>*</span></Label>
                                <Input id={`${id}-contrato`} name="nro_c" placeholder="####..." type="text" onChange={handleChange} value={nro_c} />
                                <InputError message={errors['nro_c']} />
                            </div>
                            <InputDateCliente
                                selected={fecha_c}
                                onSelect={onChangeDate}
                                isOpen={open}
                                onOpenChange={setOpen}
                                placeholder="Seleccione la fecha"
                            />
                            <InputError message={errors['fecha_c']} />
                        </div>
                        <div className="*:not-first:mt-2">
                            <Label htmlFor={`${id}-name`}>Nombre del Cliente <span className='text-red-500'>*</span></Label>
                            <Input id={`${id}-name`} name="name_c" placeholder="Alex TCP ..." type="text" onChange={handleChange} value={name_c} />
                            <InputError message={errors['name_c']} />
                        </div>
                        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                            <span className="text-xs text-muted-foreground">Trabajador/es</span>
                        </div>
                        {workers.map((item, index) => {
                            const errorWorkerName = errors[`workers.${index}.name_w`];
                            const errorWorkerCi = errors[`workers.${index}.ci_w`];
                            const isErrorWorker = errorWorkerName || errorWorkerCi ? true : false;
                            return (
                                <div key={index} className="flex justify-center gap-2">
                                    <div className="grow *:not-first:mt-2">
                                        <Label htmlFor={`${id}-name-${index}`}>Nombre Trabajador <span className='text-red-500'>*</span></Label>
                                        <Input
                                            id={`${id}-name-${index}`}
                                            placeholder="Alberto Perez ..."
                                            name={`name_w_${index}`}
                                            type="text"
                                            onChange={(e) => handleChange(e, index)}
                                            value={item.name_w}
                                        />

                                        <InputError message={errorWorkerName} />
                                    </div>
                                    <div className="w-32 *:not-first:mt-2">
                                        <Label htmlFor={`${id}-ci-${index}`}>Nro. Identidad <span className='text-red-500'>*</span></Label>
                                        <Input
                                            id={`${id}-ci-${index}`}
                                            placeholder="#####..."
                                            name={`ci_w_${index}`}
                                            type="text"
                                            onChange={(e) => handleChange(e, index)}
                                            value={item.ci_w}
                                            maxLength={11}
                                        />
                                        <InputError message={errorWorkerCi} />
                                    </div>
                                    <div className={!isErrorWorker ? 'self-end' : 'self-center'}>
                                        <TooltipProvider delayDuration={0}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        id={`${index}`}
                                                        variant={index >= 1 ? 'destructive' : 'default'}
                                                        type="button"
                                                        size="icon"
                                                        aria-label="Add new item"
                                                        onClick={index > 0 ? () => handleRemoveWorker(index) : () => handleAddWorker()}
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
                            <Button type="button" className='cursor-pointer' variant="outline" onClick={handleResetForm}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" className='cursor-pointer'>{processing ? 'Creando' : 'Crear'} Cliente</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
