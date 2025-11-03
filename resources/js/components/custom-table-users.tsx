import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { EditIcon, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import DialogDeleteFormUser from './dialog-delete-from-user';
import { DialogEditFormUser } from './dialog-edit-form-user';

interface ColumnsPropUser {
    key: string;
    label: string;
    className: string;
    isAction?: boolean;
}
interface ActionsProp {
    label: string;
    icon: typeof EditIcon | typeof Trash2;
    className: string;
    route: string;
}

interface CustomTableProps {
    users_list: User[];
    formIndex: number;
    columns: ColumnsPropUser[];
    actions: ActionsProp[];
}

function CustomTableUsers({ users_list, formIndex, columns }: CustomTableProps) {
    const { delete: destroy } = useForm();
    // const { auth } = usePage<SharedData>().props;
    // const is_roleRead = auth.user.role === 'supervisor';

    const hanleRemoveRowUser = (user: User) => {
        console.log(user);
        destroy(route('gestion.usuarios.destroy', { usuario: user }), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('Cliente Eliminado Correctamente');
            },
            onError: (errors) => {
                toast.error(errors.error || 'Error al eliminar Cliente');
            },
        });
    };
    // console.log(dataPage)
    return (
        <div className="overflow-hidden rounded-md border bg-background">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50 text-base">
                        {/* <TableHead className="h-12 py-2">#</TableHead> */}
                        {columns.map((col) => (
                            <TableHead key={col.key} className={col.className}>
                                {col.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users_list.length > 0 ? (
                        users_list.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell className="h-12 py-2 font-semibold text-muted-foreground">{index + formIndex}</TableCell>
                                <TableCell className="h-12 py-2">{user.name}</TableCell>
                                <TableCell className="h-12 py-2">{user.last_name}</TableCell>
                                <TableCell className="h-12 py-2">{user.user_name}</TableCell>
                                <TableCell className="h-12 py-2">{user.sucursal}</TableCell>
                                <TableCell className="h-12 py-2">{user.role}</TableCell>
                                <TableCell className="flex h-12 gap-2 py-2">
                                    <DialogEditFormUser userData={user} />
                                    <DialogDeleteFormUser handleDeleteClick={() => hanleRemoveRowUser(user)} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="h-12 py-2 text-center font-sans text-lg text-red-500">
                                No existen datos para esa búsqueda
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default CustomTableUsers;
