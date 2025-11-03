import { FrownIcon } from 'lucide-react';
import { Card, CardContent, CardDescription} from './ui/card';

function CustomCardEmpty() {
    return (
        <Card className="col-span-4 border-secondary">           
            <CardContent className="flex gap-3 items-center justify-center">
                <FrownIcon size={32} color='red' />
                <CardDescription className='text-lg text-red-600'>No se encontraron datos para esa Búsqueda</CardDescription>
            </CardContent>
        </Card>
    );
}

export default CustomCardEmpty;
