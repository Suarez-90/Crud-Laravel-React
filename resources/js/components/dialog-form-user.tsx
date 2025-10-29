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
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useId, useState } from 'react';
import { toast } from 'sonner';
import InputError from './input-error';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { useLettersUser } from '@/hooks/use-letter-user';
import { useAppearance } from '@/hooks/use-appearance';
import { LoaderCircle } from 'lucide-react';

export default function DialogFormUser() {
    const [openModal, setOpenModal] = useState(false);
    const id = useId();

   const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
           name: '',
           last_name: '',
           user_name: '',
           sucursal: '',        
           password: '',
           password_confirmation: '',
       });
       const getInitials = useLettersUser();
       const valueAppearance = useAppearance().appearance;
   
       const onHandleBlur = ()=>{
           const userName = getInitials(data.name, data.last_name);
           setData('user_name', userName);
       }
       
   
       const submit: FormEventHandler = (e) => {
           e.preventDefault();
           post(route('register'), {
               onSuccess: () => toast.success('Bienvenido!!. Cuenta creada correctamente'),
               onError: (errors) => toast.error(errors.error || 'Error al crear la Cuenta'),
               onFinish: () => reset('password', 'password_confirmation'),
           });
       };
    const handleResetForm = () => {
        const newState = !openModal;
        if (newState == false) {
            reset();            
            clearErrors();
        }
        setOpenModal(newState);
    };

    

    return (
        <Dialog open={openModal} onOpenChange={handleResetForm}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" variant="default">
                    Agregar Usuario
                </Button>
            </DialogTrigger>
            <DialogContent className="lg:max-w-lg" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={handleResetForm}>
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

                <form onSubmit={submit} className="space-y-5 pt-4">
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor={id+"-name"}>Nombre/s</Label>
                            <Input
                                id={id+"-name"}
                                type="text"
                                autoFocus
                                tabIndex={1}
                                onBlur={onHandleBlur}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Nombre/s"
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor={id+"-last_name"}>Apellidos</Label>
                            <Input
                                id={id+"-last_name"}
                                type="text"
                                tabIndex={2}
                                onBlur={onHandleBlur}
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                disabled={processing}
                                placeholder="Apellidos"
                            />
                            <InputError message={errors.last_name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor={id+"-user_name"}>Usuario</Label>
                            <Input
                                id={id+"-user_name"}
                                type="text"
                                className="text-muted-foreground"
                                tabIndex={3}
                                value={data.user_name}
                                // disabled
                                readOnly
                                placeholder="No definido"
                            />
                            <InputError message={errors.user_name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor={id+"-register_sucursal"} className="">
                                Sucursal
                            </Label>
                            <Select onValueChange={(value) => setData('sucursal', value)} value={data.sucursal} disabled={processing}>
                                <SelectTrigger id={id+"-register_sucursal"} tabIndex={4}>
                                    <SelectValue placeholder="Seleccione la Sucursal" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Sucursales</SelectLabel>
                                        <SelectItem value="habana">Habana</SelectItem>
                                        <SelectItem value="santa clara">Santa Clara</SelectItem>
                                        <SelectItem value="cienfuegos">Cienfuegos</SelectItem>
                                        <SelectItem value="matanzas">Matanzas</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.sucursal} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                tabIndex={5}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                tabIndex={6}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Confirm password"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        {/* <Button type="submit" className="mt-2 w-full cursor-pointer" tabIndex={7} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Crear Cuenta
                        </Button> */}
                    </div>
                    {/* <div className="space-y-4">
                        <div className="flex gap-2">
                            <div className="*:not-first:mt-2">
                                <Label htmlFor={`${id}-contrato`}>Nro. Contrato <span className='text-red-600'>*</span></Label>
                                <Input id={`${id}-contrato`} name="nro_c" placeholder="####..." type="text" onChange={handleChange} value={nro_c} />
                                <InputError message={errors['nro_c']} />
                            </div>                           
                            <InputError message={errors['fecha_c']} />
                        </div>
                        <div className="*:not-first:mt-2">
                            <Label htmlFor={`${id}-name`}>Nombre del Cliente <span className='text-red-600'>*</span></Label>
                            <Input id={`${id}-name`} name="name_c" placeholder="Alex TCP ..." type="text" onChange={handleChange} value={name_c} />
                            <InputError message={errors['name_c']} />
                        </div>
                    </div>                     */}
                    <DialogFooter className="border-t px-6 py-4">
                        <DialogClose asChild>
                            <Button type="button" className="cursor-pointer" variant="outline" onClick={handleResetForm}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="cursor-pointer">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            {processing ? 'Creando' : 'Crear'} Cliente
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
