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
import { HandshakeIcon, IdCardIcon, ListCheckIcon, UserCheck } from 'lucide-react';
import { Separator } from './ui/separator';

interface DialogTrabProps {
    name: string;
    listTrab: CommentData[];
    wButton : string | undefined    
}

function DialogListTrab({ name, listTrab, wButton }: DialogTrabProps) {
   
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className={`cursor-pointer gap-2 ${wButton}`}>
                    <ListCheckIcon />
                    {`Ver Trabajadores`}
                    <span className={'-me-1 inline-flex h-5 max-h-full items-center rounded border bg-accent px-1 pt-0.5 font-[inherit] text-[0.625rem] font-medium text-foreground'}>
                        {listTrab.length}
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(e)=>e.preventDefault()} className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
                <div className="overflow-y-auto">
                    <DialogHeader className="contents space-y-0 text-left">
                        {/* <DialogTitle className="px-6 pt-6 text-base">
                            Trabajadores de <strong className="text-lg italic">{name}</strong>
                        </DialogTitle> */}
                        <DialogTitle className="px-6 pt-6">
                            <div className='flex gap-1.5 items-center'>
                                <HandshakeIcon />
                                <strong className="text-xl italic">{name}</strong>
                            </div>
                            <p className="pt-2 text-base font-light text-muted-foreground">Listado de Trabajadores</p>
                        </DialogTitle>
                        {/* <DialogDescription className="" >Trabajadores de </DialogDescription> */}
                        <DialogDescription asChild>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {listTrab.map((item, i) => {
                                        return (
                                            <div key={item.id} className="space-y-4">
                                                <div className="flex justify-between text-base">
                                                    <p className='flex gap-2 items-center'>
                                                        <UserCheck size={18}/>
                                                        <strong className="">{item.name_c}</strong>
                                                    </p>
                                                    <p className='flex gap-2 items-center'>
                                                        <IdCardIcon size={18}/>
                                                        {item.nro_ident}
                                                    </p>
                                                </div>
                                                {i < listTrab.length - 1 && <Separator />}
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
                        <Button type="button" variant="outline" className='cursor-pointer'>
                            Cerrar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DialogListTrab;
