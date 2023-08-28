import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform{
    transform(clubs:any[], searchText: string):any[] {
        if(!clubs) return[];
        if(!searchText) return clubs;

        searchText = searchText.toLowerCase();

        return clubs.filter(val => {
            return val.name.toLowerCase().startsWith(searchText);
        });
    }
}