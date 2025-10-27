import { EditIcon, Trash2 } from "lucide-react";

export const ClientesTableConfig = {
    columns: [
        {label: '#', key: '#', className: 'py-2 h-12'},
        {label: 'Nro. Contrato', key: 'contrato', className: 'py-2 h-12'},
        {label: 'Nombre Cliente', key: 'name', className: 'py-2 h-12'},
        {label: 'Fecha Contrato', key: 'fecha_contrato', className: 'py-2 h-12'},
        {label: 'Autorizados', key: 'autorizados', className: 'py-2 h-12'},
        {label: 'Trabajadores', key: 'trabajadores', className: 'py-2 h-12'},
        {label: 'Acciones', key: 'acciones', isAction:true, className: 'py-2 h-12'}
    ],
    actions:[
        {label: 'Edit', icon: EditIcon, route:'/admin/clientes/show', className: 'bg-blue-600'},
        {label: 'Delete', icon: Trash2, route:'post.destroy', className: 'bg-red-600'}
    ]
}