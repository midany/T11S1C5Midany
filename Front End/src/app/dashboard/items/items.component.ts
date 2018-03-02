import { Component } from '@angular/core';
import {ItemsService} from './items.service'

@Component({
  selector: 'app-dashboard-items',
  templateUrl: './items.component.html'
})

export class ItemsComponent {
  settings = {
    add:{
      confirmCreate:true
     },
     
     edit:{
      confirmSave:true
     },
     delete :{
      confirmDelete: true
    },
    columns: {
      name: {
        title: 'Product Name'
      },
      componentNo:{
        title:'componentNo'
      },
      price: {
        title: 'Price'
      },
      createdAt: {
        title: 'Created at'
      },
      updatedAt: {
        title: 'Updated at'
       },
      },
      
  };
  products;

  constructor(private ItemsService: ItemsService) { 
  }
  
  ngOnInit() { 
    this.ItemsService.products().subscribe(
      (res:any)=>{ 
        this.products = res.data;
        console.log(res);
      }
    ) 
  }
  onDelete(event){
    console.log("delete");
    
      }
      onDeleteConfirm(event):void{
        console.log(event.data._id); 
        this.ItemsService.deleteuserProducts(event.data._id).subscribe();
          event.confirm.resolve();
        
      }
      onCreateConfirm(event){
        console.log(event.newData);
        event.confirm.resolve(event.newData);
        this.ItemsService.createuserProducts(event.newData.name,event.newData.price,window.sessionStorage.username,event.newData.componentNo).subscribe();
      }
      onUpdateConfirm(event){
        console.log(event.newData._id);
        event.confirm.resolve();
        this.ItemsService.updateuserProducts(event.newData._id,event.newData.name,event.newData.price,event.newData.username,event.newData.componentNo).subscribe();
      }
      
}