import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CheckCircleIcon, CheckSquareIcon, Square, XCircleIcon } from 'lucide-react';
import { Button } from './ui/button';

interface ConfirmProp {
    handleConfirmClick: () => void;
    isChecked: boolean;
    contrato: string;
}

export default function DialogConfirmClient({ handleConfirmClick, isChecked, contrato }: ConfirmProp) {
    const styleChecked = `bg-indigo-50 ${isChecked ? 'text-emerald-500' : 'text-red-400'} `;
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={'outline'}
                    className={`h-8 w-8 cursor-pointer transition-transform hover:scale-110 hover:bg-indigo-50 hover:text-emerald-600 ${styleChecked}`}
                >
                    {!isChecked ? <Square className="h-4 w-4" /> : <CheckSquareIcon className="h-4 w-4" />}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent onEscapeKeyDown={(e) => e.preventDefault()}>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex gap-3 text-xl">
                        {isChecked ? (
                            <XCircleIcon className="text-red-500 opacity-80" size={36} />
                        ) : (
                            <CheckCircleIcon className="text-emerald-500 opacity-80" size={32} />
                        )}
                        Seguro que {isChecked ? 'no' : ''} desea autorizar los Datos ?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-md">
                        Esta operación {isChecked ? 'no ' : ''}
                        <span className={`font-semibold ${!isChecked ? 'text-emerald-500' : 'text-red-500'} `}>confirmará</span> todos los Datos
                        relacionados con el Contrato Nro: <span className='font-semibold text-xl'>{contrato}</span>!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className={`cursor-pointer dark:text-foreground ${!isChecked ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-600'}`}
                        onClick={handleConfirmClick}
                    >
                        {isChecked ? 'No ' : ''}Autorizar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
