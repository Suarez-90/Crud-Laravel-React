import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    last_name: string;
    email: string;
    avatar?: string;
    role:string;
    user_name: string;
    sucursal: string;
    user_verified_at: string | null;
    // email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface LinksProps {
    active: boolean;
    label: string;
    url: string | null;
}
export interface PostData {
    id: number;
    comments: CommentData[];
    nro_contract: string;
    name_p: string;
    checked:boolean;
    date_contract: Date;
}
export interface CommentData {
    id: number;
    name_c: string;
    nro_ident: string;
    post_id: number;
}
export interface PaginationProps {
    current_page: number;
    data: PostData[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: LinksProps[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}
export interface PaginationPropsUsers {
    current_page: number;
    data: User[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: LinksProps[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}
type FiltersProps = {
    search:string
    perPage: string;
    orderPost:string
}
export interface DashboardProps {
    posts: PaginationProps;    
    filters: FiltersProps;
}
export interface UsersListProps {
    users: PaginationPropsUsers;    
    filters: FiltersProps;
}
