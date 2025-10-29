import { EditIcon, Trash2 } from "lucide-react";

export const UsuariosTableConfig = {
    columns: [
        {label: '#', key: '#', className: 'py-2 h-12'},
        {label: 'Nombre/s', key: 'name_user', className: 'py-2 h-12'},
        {label: 'Apellidos', key: 'last_name_user', className: 'py-2 h-12'},
        {label: 'Usuario', key: 'user_name', className: 'py-2 h-12'},
        {label: 'Sucursal', key: 'sucursal', className: 'py-2 h-12'},
        {label: 'Roles', key: 'roles', className: 'py-2 h-12'},
        {label: 'Acciones', key: 'acciones', isAction:true, className: 'py-2 h-12'}
    ],
    actions:[
        {label: 'Edit', icon: EditIcon, route:'/admin/clientes/show', className: 'bg-blue-600'},
        {label: 'Delete', icon: Trash2, route:'post.destroy', className: 'bg-red-600'}
    ]
}