import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useId } from 'react';

import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { buttonVariants } from './ui/button';
// import { cn } from '@/lib/utils';

type PaginationDataProps = {
    current_page: number;
    total: number;
    last_page: number;
    first_page_url: string;
    prev_page_url: string;
    last_page_url: string;
    next_page_url: string;
};
interface PaginationData {
    postsPag: PaginationDataProps;
    per_Page: string;
    onSelectChange: (value: string) => void;
}

function IndexPagination({ postsPag, per_Page, onSelectChange }: PaginationData) {
    const { current_page, last_page, first_page_url, prev_page_url, next_page_url, last_page_url, total } = postsPag;
    const id = useId();
    // console.log(postsPag)

    return (
        <div className="flex items-center justify-between gap-6">
            {/* Results per page */}
            <div className="flex items-center gap-3">
                <Label htmlFor={id}>Datos por páginas</Label>
                <Select onValueChange={onSelectChange} value={per_Page}>
                    <SelectTrigger id={id} className="w-fit gap-1.5 whitespace-nowrap">
                        <SelectValue placeholder="Select number of results" />
                    </SelectTrigger>
                    <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        {/* <SelectItem value="15">15</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem> */}
                    </SelectContent>
                </Select>
            </div>

            {/* Page number information */}
            <div className="flex grow justify-end text-sm whitespace-nowrap text-muted-foreground">
                <p className="text-sm whitespace-nowrap text-muted-foreground" aria-live="polite">
                    <span className="text-foreground">1-{per_Page}</span> of <span className="text-foreground">{total}</span>
                </p>
            </div>

            {/* Pagination */}
            <div>
                <Pagination>
                    <PaginationContent>
                        {/* First page button */}
                        <PaginationItem>
                            <PaginationLink
                                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                                href={first_page_url}
                                aria-label="Go to first page"
                                aria-disabled={current_page === 1 ? true : undefined}
                                role={current_page === 1 ? 'link' : undefined}
                            >
                                <ChevronFirstIcon size={16} aria-hidden="true" />
                            </PaginationLink>
                        </PaginationItem>

                        {/* Previous page button */}
                        <PaginationItem>
                            <PaginationLink
                                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                                href={prev_page_url || '#'}
                                aria-label="Go to previous page"
                                aria-disabled={current_page === 1 ? true : undefined}
                                role={current_page === 1 ? 'link' : undefined}
                            >
                                <ChevronLeftIcon size={16} aria-hidden="true" />
                            </PaginationLink>
                        </PaginationItem>

                        {/* Button Options Pagination */}
                         {current_page > 1 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        )}                                                                          
                        <PaginationItem >
                            <PaginationLink
                                className='bg-accent text-accent-foreground pointer-events-none'
                                href={'#'}>
                                {current_page}
                            </PaginationLink>
                        </PaginationItem>
                        {current_page < last_page && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        )}

                        {/* Next page button */}
                        <PaginationItem>
                            <PaginationLink
                                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                                href={next_page_url || ' #'}
                                aria-label="Go to next page"
                                aria-disabled={current_page === last_page ? true : undefined}
                                role={current_page === last_page ? 'link' : undefined}
                            >
                                <ChevronRightIcon size={16} aria-hidden="true" />
                            </PaginationLink>
                        </PaginationItem>

                        {/* Last page button */}
                        <PaginationItem>
                            <PaginationLink
                                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                                href={last_page_url || '#'}
                                aria-label="Go to last page"
                                aria-disabled={current_page === last_page ? true : undefined}
                                role={current_page === last_page ? 'link' : undefined}
                            >
                                <ChevronLastIcon size={16} aria-hidden="true" />
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}

export default IndexPagination;
