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
import { Button } from '@/components/ui/button';
import { OctagonAlert, Trash2 } from 'lucide-react';

interface DeleteProp {
    handleDeleteClick : ()=>void
}

export default function DialogDeleteFormClient({handleDeleteClick}:DeleteProp) {
    // const handleDeleteClick = () => {
    //     console.log('Delete');
    // };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={'destructive'} className="h-8 w-8 cursor-pointer transition-transform hover:scale-110 hover:opacity-80">
                    <Trash2 color="white" className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent onEscapeKeyDown={(e) => e.preventDefault()}>
                {/* <div className="flex flex-col items-center gap-2"> */}
                    <AlertDialogHeader>
                        {/* <div className="flex size-12 items-center justify-center rounded-full border"> */}
                            
                            <AlertDialogTitle className='flex gap-3 text-2xl'>
                                <OctagonAlert color="red" className="opacity-80" size={32} />
                                Are you sure?</AlertDialogTitle>
                        {/* </div> */}
                        <AlertDialogDescription className='text-md'>
                            Esta operación <span className='text-red-500 font-semibold'>eliminará</span> el Cliente con sus Trabajadores !
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                {/* </div> */}
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleDeleteClick}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
