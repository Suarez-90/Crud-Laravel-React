import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { CommentData } from '@/types';
import { Separator } from './ui/separator';

interface DialogTrabProps {
    name: string;
    listTrab: CommentData[];
}

function DialogListTrab({ name, listTrab }: DialogTrabProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-3 cursor-pointer">
                    {`Trabajadores`}
                    <span className="-me-1 bg-cyan-500 inline-flex h-5 max-h-full items-center rounded border px-1 pt-0.5 font-[inherit] text-[0.625rem] font-medium text-muted-foreground">
                        {listTrab.length}
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
                <div className="overflow-y-auto">
                    <DialogHeader className="contents space-y-0 text-left">
                        <DialogTitle className="px-6 pt-6 text-base" >Trabajadores de <strong className='italic text-lg'>{name}</strong></DialogTitle>
                        <DialogDescription asChild>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {listTrab.map((item, i) => {
                                        return (
                                            <div key={item.id} className='space-y-4'>
                                                <div className="text-base flex justify-between">
                                                    <p>
                                                        <strong className=''>{item.name_c}</strong>
                                                    </p>
                                                    <p>{item.nro_ident}</p>
                                                </div>
                                                {i < listTrab.length-1 && <Separator />}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </div>
                <DialogFooter className="border-t px-6 py-4">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cerrar
                        </Button>
                    </DialogClose>                    
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DialogListTrab;
