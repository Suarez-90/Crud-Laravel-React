import IndexPagination from '@/components/app-pagination';
import CustomTable from '@/components/custom-table';
import DialogFormCliente from '@/components/dialog-form-client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toaster } from '@/components/ui/sonner';
import { ClientesTableConfig } from '@/config/tables/clientes-table';
import { useAppearance } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import { DashboardProps, type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';
import { useId } from 'react';

function ListClientes({ ...props }: DashboardProps) {
    const idFilterTable = useId();
    const valueAppearance = useAppearance().appearance;
    const { posts, filters } = props;

    const { data, setData } = useForm({
        valueSearchTable: filters.search || '',
        perPage: filters.perPage || '15',
    });
    // console.log();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
    ];

    const onFilterTableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueSearch = e.target.value;
        if (valueSearch.startsWith(' ')) return;

        setData('valueSearchTable', valueSearch);
        const queryFilter = {
            ...(valueSearch && { search: valueSearch }),
            // ...(data.orderPost && data.orderPost !== 'default' && { orderPost: data.orderPost }),
            ...(data.perPage && { perPage: data.perPage }),
        };
        /*Send Request to Controller */
        router.get(route('admin.post.index'), queryFilter, {
            preserveState: true,
            preserveScroll: true,
        });
    };
    const handleSelectTable = (value: string) => {
         setData('perPage', value);

        const queryString = {
            ...(data.valueSearchTable && { search : data.valueSearchTable}),
            // ...(data.orderPost && data.orderPost !=='default' && { orderPost : data.orderPost}),
            ...(value && { perPage: value}),
        }
        console.log(queryString)
        /*Send Request to Controller */
        router.get(
            route('admin.post.index'),queryString,
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes" />
            <Toaster position="top-right" duration={2000} richColors theme={valueAppearance} />
            <div className="flex h-full flex-1 flex-col gap-3 overflow-x-auto rounded-xl p-4">
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
                        <DialogFormCliente />
                    </nav>
                </header>
                <CustomTable posts_list={posts.data} formIndex={posts.from} columns={ClientesTableConfig.columns} actions={ClientesTableConfig.actions} />
                <IndexPagination postsPag={posts} per_Page={data.perPage} onSelectChange={handleSelectTable} />
            </div>
        </AppLayout>
    );
}

export default ListClientes;
