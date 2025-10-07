import IndexPagination from '@/components/app-pagination';
import CustomTable from '@/components/custom-table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ClientesTableConfig } from '@/config/tables/clientes-table';
import AppLayout from '@/layouts/app-layout';
import { DashboardProps, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useId, } from 'react';
// import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import DialogFormCliente from '@/components/dialog-form-client';

function ListClientes({ posts }: Omit<DashboardProps, 'filters'>) {
    const idFilterTable = useId();
    
    const { data } = useForm({
        valueSearchTable: '',
    });
    // console.log(posts.data);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
    ]; 

    const onFilterTableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    const handleSelectTable = () => {
        console.log('first');
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes" />
            <div className="flex h-full flex-1 flex-col gap-2 overflow-x-auto rounded-xl p-4">
                <header className="mb-2 flex flex-col items-start gap-4">
                    <h1 className="text-2xl font-bold">Listado de Clientes</h1>
                    <nav className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <Label htmlFor={idFilterTable} className="text-md">
                                Buscar Clientes:
                            </Label>
                            <div className="relative">
                                <Input
                                    onChange={onFilterTableChange}
                                    value={data.valueSearchTable}
                                    name="search_post_table"
                                    autoFocus
                                    id={idFilterTable}
                                    className="peer w-96 ps-9"
                                    placeholder="Buscar..."
                                    type="search"
                                />
                                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                    <SearchIcon size={16} />
                                </div>
                            </div>
                        </div>
                        {/* <div className="flex justify-center py-4">
                            <Calendar mode="single" defaultMonth={date} selected={date} onSelect={setDate} className="rounded-lg border shadow-sm" />
                        </div> */}
                        {/* <Link href={route('admin.post.create')}>
                            <Button variant={'ghost'}>Agregar Cliente</Button>
                        </Link> */}
                        <DialogFormCliente />
                    </nav>
                </header>
                <CustomTable posts_list={posts.data} columns={ClientesTableConfig.columns} actions={ClientesTableConfig.actions} />
                <IndexPagination postsPag={posts} per_Page="6" onSelectChange={handleSelectTable} />
            </div>
        </AppLayout>
    );
}

export default ListClientes;
