import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PostData } from '@/types';
// import { Link } from '@inertiajs/react';
import { EditIcon, Trash2 } from 'lucide-react';
// import { Button } from './ui/button';
import DialogListTrab from './dialog-list-trab';
import { DialogEditFormClient } from './dialog-edit-form-client';
import DialogDeleteFormClient from './dialog-delete-from-client';
import { useForm } from '@inertiajs/react';

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
    columns: ColumnsProp[];
    actions: ActionsProp[];
}

function CustomTable({ posts_list, columns }: CustomTableProps) {
    const {delete:destroy} = useForm()
    
    const hanleRemoveRow =(post:PostData)=>{
        destroy(route('admin.post.destroy', post.id),{
            preserveScroll:true
        });
    }
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
                    {posts_list.map((post, index) => (                        
                        <TableRow key={post.id}>
                            <TableCell className="h-12 py-2">{index + 1}</TableCell>
                            <TableCell className="h-12 py-2">{post.nro_contract}</TableCell>
                            <TableCell className="h-12 py-2">{post.name_p}</TableCell>
                            <TableCell className="h-12 py-2">{new Date(post.date_contract).toLocaleDateString()}</TableCell>
                            <TableCell className="h-12 py-2">
                              <DialogListTrab name={post.name_p} listTrab={post.comments}/>                                                               
                            </TableCell>
                            <TableCell className="flex h-12 py-2 gap-2">
                                <DialogEditFormClient postClient={post}/>
                                <DialogDeleteFormClient handleDeleteClick={()=>hanleRemoveRow(post)}/>
                                {/* {actions.map((item, index) => (                                    
                                     <Link
                                        as="button"
                                        key={index}
                                        href={item.route}
                                        onClick={()=>console.log(item.route)}
                                        className={`ms-2 cursor-pointer rounded-lg p-2 text-white hover:opacity-80 transition-transform hover:scale-115 ${item.className}`}
                                    > */}
                                        {/* <Icon iconNode={item.icon} className={item.className}/> */}
                                        {/* {<item.icon size={14} className='' />}
                                    </Link>
                                   <Link key={index} href={'#'}>
                                        
                                     </Link> 
                                ))} */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default CustomTable;
