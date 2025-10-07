import { DialogEditFormClient } from '@/components/dialog-edit-form-client';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

function FormCliente() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'New Cliente',
            href: '/admin/clientes/create',
        },
    ];
    return (
        <DialogEditFormClient/>
        // <AppLayout breadcrumbs={breadcrumbs}>
        //     <Head title="Clientes" />
        //     <div className="flex h-full flex-1 flex-col gap-2 overflow-x-auto rounded-xl p-4">
        //     </div>

        // </AppLayout>
    );
}

export default FormCliente;
