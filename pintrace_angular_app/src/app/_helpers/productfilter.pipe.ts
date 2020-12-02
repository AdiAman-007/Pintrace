import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productfilter'
})
export class ProductfilterPipe implements PipeTransform {
  searchKey:string

  transform(items: any[], searchText: string): any[] {
    this.searchKey = searchText

    if(!items) return [];
    if(!this.searchKey) return items;

    let filterList = []
    for(let item of items){
      if(item['productid'].toLowerCase().includes(this.searchKey) ||
      item['productcode'].toLowerCase().includes(this.searchKey) ||
      item['productname'].toLowerCase().includes(this.searchKey) ||
      item['manufacturedate'].toLowerCase().includes(this.searchKey) ||
      item['dimensions'].toLowerCase().includes(this.searchKey) ||
      item['weight'].toLowerCase().includes(this.searchKey)){
        filterList.push(item)
      }
    }
    return filterList
  }
}
