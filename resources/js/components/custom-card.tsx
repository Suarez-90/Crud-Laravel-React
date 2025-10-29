import { CalendarDays, NotebookPen} from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Icon } from './ui/icon';
import DialogListTrab from './dialog-list-trab';

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
    commts_post: CommentData[];
}

function CustomCard({ nro_c, name_c, date_c, commts_post }: CardProps) {
    //  const newDate = date_c.split('-').toReversed().join('-');
     const newDate = new Date(date_c).toLocaleDateString();
    return (
        <Card className="gap-3 w-full">
            <CardHeader className="grid auto-rows-min grid-cols-2 items-start">
                <CardDescription className="flex flex-nowrap gap-1">
                    <Icon iconNode={NotebookPen} className="w-4" />
                    Contrato
                </CardDescription>
                <CardDescription className="col-start-2 ml-auto">
                    <Badge variant={'outline'} className="h-6">
                        <Icon iconNode={CalendarDays} />
                        {newDate}
                    </Badge>
                </CardDescription>
                <CardTitle className="text-3xl tabular-nums">{nro_c}</CardTitle>
                <CardDescription className="col-span-2 text-base font-medium">{name_c}</CardDescription>
            </CardHeader>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                {/* <span className="relative z-10 bg-card px-2 font-semibold">Trabajadores</span> */}
            </div>
            <CardContent className=''>                
                <DialogListTrab name={name_c} listTrab={commts_post} wButton='w-full'/>
                    
                {/* <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
                    {commts_post?.map((commt) => {
                        return (
                            <li key={commt.id} className="line-clamp-1 flex flex-nowrap items-center justify-between gap-1 font-medium ">
                                <span className="flex flex-nowrap items-center gap-1 ">
                                    <Icon iconNode={UserCheck} className="w-4" />
                                    {commt.name_c}
                                </span>
                                <span className="">{commt.nro_ident}</span>
                            </li>
                        );
                    })}
                </ul> */}
            </CardContent>
        </Card>
    );
}

export default CustomCard;
