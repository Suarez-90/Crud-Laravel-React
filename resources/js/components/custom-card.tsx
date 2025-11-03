import { CalendarDays, CheckCircle2Icon, NotebookPen } from 'lucide-react';
import DialogListTrab from './dialog-list-trab';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Icon } from './ui/icon';

export interface CommentData {
    id: number;
    name_c: string;
    nro_ident: string;
    post_id: number;
}

interface CardProps {
    nro_c: string;
    name_c: string;
    date_c: Date;
    checked: boolean;
    commts_post: CommentData[];
}

function CustomCard({ nro_c, name_c, date_c, checked, commts_post }: CardProps) {
    //  const newDate = date_c.split('-').toReversed().join('-');
    const newDate = new Date(date_c).toLocaleDateString();
    return (
        <Card className="w-full gap-2 border-2">
            <CardHeader className="grid auto-rows-min grid-cols-2 items-start">
                <CardDescription className="flex flex-nowrap gap-1">
                    <Icon iconNode={NotebookPen} className="w-4" />
                    Contrato
                </CardDescription>
                <CardDescription className="col-start-2 ml-auto">
                    {checked && (
                        <Badge className="gap-1 text-emerald-600" variant={'outline'}>
                            <CheckCircle2Icon className="text-emerald-500" size={8} aria-hidden="true" />
                            Autorizado
                        </Badge>
                    )}
                </CardDescription>
                <CardTitle className="text-3xl tabular-nums">{nro_c}</CardTitle>
                <CardDescription className="col-start-2 ml-auto self-center">
                    <Badge variant={'outline'} className="h-6">
                        <Icon iconNode={CalendarDays} />
                        {newDate}
                    </Badge>
                </CardDescription>
                <CardDescription className="col-span-2 text-base font-medium">{name_c}</CardDescription>
            </CardHeader>
            {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 font-semibold">Trabajadores</span>
            </div> */}
            <CardContent className="">
                <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                    <span className="text-xs text-muted-foreground">Trabajadores</span>
                </div>
            </CardContent>
            <CardFooter>
                <DialogListTrab name={name_c} listTrab={commts_post} wButton="w-full" />
            </CardFooter>
        </Card>
    );
}

export default CustomCard;
