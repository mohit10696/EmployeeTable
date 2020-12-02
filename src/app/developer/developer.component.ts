import { Employee } from './../employee.model';
import { EmployeeService } from './../employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent implements OnInit {

  Employeelist:Employee[];
  constructor(private EmployeeService:EmployeeService) { }

  ngOnInit(): void {
    this.Employeelist = this.EmployeeService.EmployeeArray;
    this.EmployeeService.DataAdded
    .subscribe(
      (Employees:Employee[])=>{
        this.Employeelist = Employees;
      }
    );
  }

  checkdeveloper(designation){
    //console.log("in developer check"+designation);
    if(designation == 'developer') {return true; }
    else { return false; }
  }
  editDeveloper(i){
    console.log(this.Employeelist[i].id);
    this.EmployeeService.startedEditing.next(i);
  }
  deleteDeveloper(i){
    console.log("Deleting"+this.Employeelist[i].id);
    this.EmployeeService.delete(i);
  }




}
