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
// import { useAppearance } from '@/hooks/use-appearance';
import { useLettersUser } from '@/hooks/use-letter-user';
import { useForm } from '@inertiajs/react';
import { LoaderCircle, PlusIcon, UserPlus2Icon } from 'lucide-react';
import { FormEventHandler, useId, useState } from 'react';
import { toast } from 'sonner';
import InputError from './input-error';
import { ComboBoxSuc } from './select-box';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';

export default function DialogFormUser() {
    const [openModal, setOpenModal] = useState(false);    
    const id = useId();

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        last_name: '',
        user_name: '',
        sucursal: '',
        role: 'lector',
        password: '',
        password_confirmation: '',
    });
    const getInitials = useLettersUser();
    // const valueAppearance = useAppearance().appearance;
    
    const onHandleBlur = () => {
        const userName = getInitials(data.name, data.last_name);
        setData('user_name', userName);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('gestion.usuarios.store'), {
            onSuccess: () => {
                handleResetFormUser();
                toast.success('Bienvenido!!. Usuario creado correctamente');
            },
            onError: (errors) => toast.error(errors.error || 'Error al crear el Usuario'),
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };
    const handleResetFormUser = () => {
        const newModalState = !openModal;
        if (newModalState == false) {
            reset();
            clearErrors();
        }
        setOpenModal(newModalState);
    };

    return (
        <Dialog open={openModal} onOpenChange={handleResetFormUser}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" variant="default">
                    <PlusIcon/>
                    Agregar Usuario
                </Button>
            </DialogTrigger>
            <DialogContent className="lg:max-w-lg" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={handleResetFormUser}>
                <div className="flex flex-col items-center gap-2">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full border" aria-hidden="true">
                        <UserPlus2Icon size={32}/>                     
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">Crear un nuevo Cliente</DialogTitle>
                        <DialogDescription className="sm:text-center">Introduzca los datos correspondiente del Cliente </DialogDescription>
                    </DialogHeader>
                </div>

                <form onSubmit={submit} className="space-y-5 pt-4">
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
                            <ComboBoxSuc valueCombox={undefined} handleSelect={(val)=>setData('sucursal',val)}/>
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
                        <div className="grid gap-2">
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
                        </div>                        
                    </div>                               
                    <DialogFooter className="border-t px-6 py-4">
                        <DialogClose asChild>
                            <Button tabIndex={9} type="button" className="cursor-pointer" variant="outline" onClick={handleResetFormUser}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button tabIndex={8} type="submit" className="cursor-pointer">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            {processing ? 'Creando' : 'Crear'} Usuario
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
