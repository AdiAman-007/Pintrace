import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})


export class FilterPipe implements PipeTransform {
  searchKey:string

  transform(items: any[], searchText: string): any[] {
    this.searchKey = searchText

    if(!items) return [];
    if(!this.searchKey) return items;

    let filterList = []
    for(let item of items){
      if(item['_id'].toLowerCase().includes(this.searchKey) ||
      item['supplier'].toLowerCase().includes(this.searchKey) ||
      item['orderdate'].toLowerCase().includes(this.searchKey) ||
      item['deliverdate'].toLowerCase().includes(this.searchKey) ||
      item['deliverlocation'].toLowerCase().includes(this.searchKey) ||
      item['status'].toLowerCase().includes(this.searchKey)){
        filterList.push(item)
      }
    }
    return filterList
  }
}