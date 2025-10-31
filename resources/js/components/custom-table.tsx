import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PostData, SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { CheckCircle2Icon, EditIcon, Trash2, XCircleIcon } from 'lucide-react';
import DialogConfirmClient from './dialog-confirmation-client';
import { DialogEditFormClient } from './dialog-edit-form-client';
import DialogListTrab from './dialog-list-trab';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import DialogDeleteFormClient from './dialog-delete-from-client';

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
    const { put, delete:destroy } = useForm();
    // const [checked, setChecked] = useState<boolean>(false);
    const { auth } = usePage<SharedData>().props;
    const is_roleRead = auth.user.role === 'supervisor';
    const is_roleEditor = auth.user.role === 'editor';
    const is_roleAdmin = auth.user.role === 'admin';

    const handleConfirmation = (postClient: PostData) => {
         put(route('gestion.post.update-check',  {post:postClient.id}), {
            preserveScroll: true,
            // preserveUrl:true,
            onSuccess: () => {
                toast.success('Datos del Cliente Actualizados Correctamente');
            },
            onError: (errors) => {
                toast.error(errors.error || 'Error Actualizados los Datos del Cliente');
            },
        });
    };

    const handleRemoveRow = (post: PostData) => {
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
                                    {post.checked ? (
                                        <Badge className="gap-1 text-emerald-600" variant={'outline'}>
                                            <CheckCircle2Icon className="text-emerald-500" size={8} aria-hidden="true" />
                                            autorizado
                                        </Badge>
                                    ) : (
                                        <Badge className="gap-1 text-red-500" variant={'outline'}>
                                            <XCircleIcon className="text-red-500" size={8} aria-hidden="true" />
                                            pendiente
                                        </Badge>
                                    )}
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
                                    {(is_roleAdmin || is_roleEditor) && <DialogDeleteFormClient handleDeleteClick={() => handleRemoveRow(post)} />}
                                    {(is_roleAdmin || is_roleRead) && <DialogConfirmClient handleConfirmClick={() => handleConfirmation(post)} isChecked={post.checked} contrato={post.nro_contract}/>}
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
