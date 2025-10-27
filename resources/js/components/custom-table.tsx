import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PostData, SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { CheckCircle2Icon, EditIcon, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import CheckBoxClient from './custom-check-client';
import DialogDeleteFormClient from './dialog-delete-from-client';
import { DialogEditFormClient } from './dialog-edit-form-client';
import DialogListTrab from './dialog-list-trab';
import { Badge } from './ui/badge';

interface ColumnsProp {
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
    posts_list: PostData[];
    formIndex: number;
    columns: ColumnsProp[];
    actions: ActionsProp[];
}

function CustomTable({ posts_list, formIndex, columns }: CustomTableProps) {
    const { delete: destroy } = useForm();
    const { auth } = usePage<SharedData>().props;
    const is_roleRead = auth.user.role === 'supervisor';

    const hanleRemoveRow = (post: PostData) => {
        destroy(route('gestion.post.destroy', { post: post.id }), {
            preserveScroll: true,
            // preserveState: true,
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
                    {posts_list.length > 0 ? (
                        posts_list.map((post, index) => (
                            <TableRow key={post.id}>
                                <TableCell className="h-12 py-2 font-semibold text-muted-foreground">{index + formIndex}</TableCell>
                                <TableCell className="h-12 py-2">{post.nro_contract}</TableCell>
                                <TableCell className="h-12 py-2">{post.name_p}</TableCell>
                                <TableCell className="h-12 py-2">{new Date(post.date_contract).toLocaleDateString()}</TableCell>
                                <TableCell className="h-12 py-2">
                                    {post.checked ? <Badge className="gap-1" variant={'outline'}>
                                        <CheckCircle2Icon className="text-emerald-500" size={8} aria-hidden="true" />
                                        autorizado
                                    </Badge> : 
                                    <Badge className="gap-1 text-red-500" variant={'outline'}>
                                        {/* <CheckCircle2Icon className="text-emerald-500" size={12} aria-hidden="true" /> */}
                                        pendiente
                                    </Badge> }
                                    {/* <Badge className="gap-1">
                                        <CheckCircle2Icon className="text-emerald-500" size={8} aria-hidden="true" />
                                        autorizado
                                    </Badge> */}
                                </TableCell>
                                <TableCell className="h-12 py-2">
                                    <DialogListTrab name={post.name_p} listTrab={post.comments} wButton="" />
                                </TableCell>
                                <TableCell className="flex h-12 gap-2 py-2">
                                    <DialogEditFormClient postClient={post} is_readOnly={is_roleRead} />
                                    {is_roleRead ? <CheckBoxClient /> : <DialogDeleteFormClient handleDeleteClick={() => hanleRemoveRow(post)} />}
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

export default CustomTable;
