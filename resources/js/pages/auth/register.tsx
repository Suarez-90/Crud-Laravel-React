import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthLayout from '@/layouts/auth-layout';
import { useLettersUser } from '@/hooks/use-letter-user';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { useAppearance } from '@/hooks/use-appearance';

type RegisterForm = {
    name: string;
    last_name: string;
    user_name: string;
    sucursal: string;
    // email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        last_name: '',
        user_name: '',
        sucursal: '',
        // email: '',
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
    
    return (
        <AuthLayout title="Crear una Cuenta" description="Ingrese los datos para crearte una cuenta">
            <Head title="Register" />
            <Toaster position="top-right" duration={2000} richColors theme={valueAppearance} />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre/s</Label>
                        <Input
                            id="name"
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
                        <Label htmlFor="last_name">Apellidos</Label>
                        <Input
                            id="last_name"
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
                        <Label htmlFor="user_name">Usuario</Label>
                        <Input
                            id="user_name"
                            type="text"
                            className='text-muted-foreground'
                            tabIndex={3}
                            value={data.user_name}
                            // disabled
                            readOnly
                            placeholder="No definido"
                        />
                        <InputError message={errors.user_name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor='register_sucursal' className="">
                            Sucursal
                        </Label>
                        <Select onValueChange={(value) => setData('sucursal', value)} value={data.sucursal} disabled={processing}>
                            <SelectTrigger id='register_sucursal' tabIndex={4}>
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

                    {/* <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div> */}

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

                    <Button type="submit" className="mt-2 w-full cursor-pointer" tabIndex={7} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Crear Cuenta
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    Ya tienes una cuenta?{' '}
                    <TextLink href={route('login')} tabIndex={8}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
