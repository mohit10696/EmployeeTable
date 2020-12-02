import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from './../employee.service';

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {

  Employeelist:Employee[];
  constructor(private EmployeeService: EmployeeService) { }

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
    console.log(designation);
    if(designation == "designer" )return true;
    else return false;
  }


}
