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
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { EditIcon, LoaderCircle, ScanEyeIcon, UserPenIcon } from 'lucide-react';
import { FormEvent, useId, useState } from 'react';
import { toast } from 'sonner';
import InputError from './input-error';
import { useLettersUser } from '@/hooks/use-letter-user';
import { ComboBoxSuc } from './select-box';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';

interface DialogEditUser {
    // is_readOnly : boolean,
    userData : User
}

export function DialogEditFormUser({ userData }: DialogEditUser) {
    const [openDialog, setOpenDialog] = useState(false);
    const id = useId();
    const getInitials = useLettersUser();
    
    const { name,last_name,user_name,sucursal, role, } = userData;

    const { data, setData, put, processing, errors, reset, clearErrors } = useForm({
        name: name,
        last_name: last_name,
        user_name: user_name,
        sucursal: sucursal,
        role: role,
        // password: '',
        // password_confirmation: '',
    });

    const handleResetFormUser = () => {
        const newState = !openDialog;
        if (newState == false) {
            reset();            
            clearErrors();
        }
        setOpenDialog(newState);
    };
    const onHandleBlur = () => {       
        const userName = getInitials(data.name, data.last_name);
        setData('user_name', userName);
    };

    const handleEditSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('gestion.post.update', postClient.id), {
            preserveScroll: true,
            // preserveUrl:true,
            onSuccess: () => {
                handleResetFormUser();
                toast.success('Cliente Actualizado Correctamente');
            },
            onError: (errors) => {
                toast.error(errors.error || 'Error Actualizando el Cliente');
            },
        });
    };

    return (
        <Dialog open={openDialog} onOpenChange={handleResetFormUser}>
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
                        <UserPenIcon size={32}/>
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">Actualizar Datos del Usuario</DialogTitle>
                        <DialogDescription className="sm:text-center">
                            Introduzca los nuevos datos del Usuario
                        </DialogDescription>
                    </DialogHeader>
                </div>
                <form onSubmit={handleEditSubmit} className="space-y-5 pt-4">
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor={id + '-name'}>Nombre/s</Label>
                            <Input
                                id={id + '-name'}
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
                            <Label htmlFor={id + '-last_name'}>Apellidos</Label>
                            <Input
                                id={id + '-last_name'}
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
                            <Label htmlFor={id + '-user_name'}>Usuario</Label>
                            <Input
                                id={id + '-user_name'}
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
                        <div className="grid grid-cols-3 gap-2">
                            <ComboBoxSuc handleSelect={(val)=>setData('sucursal',val)} valueCombox={sucursal}/>
                            <Select onValueChange={(value)=>setData('role',value)} value={data.role} disabled={processing}>
                                <SelectTrigger tabIndex={5} className="w-full col-start-3">
                                    <SelectValue placeholder="Seleccione el Role" />
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectGroup>
                                        <SelectLabel>Roles</SelectLabel>
                                        <SelectItem value="lector">Lector</SelectItem>
                                        <SelectItem value="editor">Editor</SelectItem>
                                        <SelectItem value="supervisor">Supervisor</SelectItem>
                                        <SelectItem value="admin">Administrador</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>                          
                            <InputError message={errors.sucursal} />
                        </div>
                        {/* <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                tabIndex={6}
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
                                tabIndex={7}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Confirm password"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>                         */}
                    </div>                               
                    <DialogFooter className="border-t px-6 py-4">
                        <DialogClose asChild>
                            <Button tabIndex={9} type="button" className="cursor-pointer" variant="outline" onClick={handleResetFormUser}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button tabIndex={8} type="submit" className="cursor-pointer">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            {processing ? 'Actualizando' : 'Actualizar'} Usuario
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    );
}
