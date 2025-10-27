import { useCallback } from 'react';

export function useLettersUser() {
    return useCallback((name:string, last:string):string=>{
        if (name ==='' || last ==='') return ''
        
        const array_name = name.trim().split(' ').filter(item=> item !=='');
        const array_lastName = last.trim().split(' ').filter(item=> item !=='');
        const last_letters = array_lastName[0];

        if (array_name.length > 1){
            const first_letters = array_name.map((item)=> item[0].charAt(0)).join('');            
            return `${first_letters}${last_letters}`.toLowerCase();
        }
        const first_letter = array_name[0].charAt(0);
        return `${first_letter}${last_letters}`.toLowerCase();
    },[])
}