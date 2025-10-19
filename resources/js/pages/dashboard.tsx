import IndexFilters from '@/components/app-filters';
import IndexPagination from '@/components/app-pagination';
import CustomCard from '@/components/custom-card';
// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { DashboardProps, type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ChangeEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ ...props }: DashboardProps) {
    const { posts, filters } = props;
    const { data, setData } = useForm({
        searchPost: filters.search || '',
        perPage: filters.perPage || '2',
        orderPost: filters.orderPost || 'default',
    });
    // console.log(posts)
    const handleSelectChange = (value: string) => {
        setData('perPage', value);

        const queryString = {
            ...(data.searchPost && { search : data.searchPost}),
            ...(data.orderPost && data.orderPost !=='default' && { orderPost : data.orderPost}),
            ...(value && { perPage: value}),
        }
        /*Send Request to Controller */
        router.get(
            route('dashboard'),queryString,
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleSelectFilterChange = (value: string) => {        
        setData('orderPost', value);
        const queryValue = {
            ...(data.searchPost && {search : data.searchPost}),
            ...(data.perPage && {perPage: data.perPage}),
            ...(value && {orderPost : value})
        }
        router.get(
            route('dashboard'), queryValue,
            {
                preserveScroll:true,
                preserveState:true,
            },
        );
    };

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        const valueSearch = e.target.value;
        if (valueSearch.startsWith(' ')) return;

        setData('searchPost', valueSearch);
        const queryFilter = {  
            ...(valueSearch &&  {search: valueSearch}),
            ...(data.orderPost && data.orderPost !=='default' && { orderPost : data.orderPost}),
            ...(data.perPage && {perPage : data.perPage})
        };

        /*Send Request to Controller */
        router.get(route('dashboard'), queryFilter, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-5 overflow-x-auto rounded-xl p-4">
                <IndexFilters
                    valuePost={data.searchPost}
                    valueSelect={data.orderPost}
                    onFilterChange={handleFilterChange}
                    onSelectFilterChange={handleSelectFilterChange}
                />

                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {posts.data.map((post) => {
                        return (
                            <CustomCard
                                key={post.id}
                                nro_c={post.nro_contract}
                                date_c={post.date_contract}
                                name_c={post.name_p}
                                commts_post={post.comments}
                            />
                        );
                    })}
                    {/* <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                     */}
                </div>
                {/* Pagination Component */}
                <IndexPagination postsPag={posts} per_Page={data.perPage} onSelectChange={handleSelectChange} />
            </div>
        </AppLayout>
    );
}
