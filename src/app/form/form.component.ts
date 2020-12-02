import { HttpClient } from '@angular/common/http';
import { Employee } from './../employee.model';
import { EmployeeService } from './../employee.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @ViewChild('form', { static: false }) formData: NgForm;
  newEmployee: Employee;
  @ViewChild('designation') designation: ElementRef;
  subscription: Subscription;
  editingMode = false;
  editingIndex;
  editingID;
  constructor(private EmployeeService: EmployeeService , private Http:HttpClient) { }

  ngOnInit(): void {
    this.subscription = this.EmployeeService.startedEditing
      .subscribe(
        (index) => {
         const UpdatingEmployee: Employee = this.EmployeeService.getEmployee(index);
         this.editingID = UpdatingEmployee.id;
         this.editingIndex = index;
         this.editingMode = true;
         this.formData.setValue(
            {
                fname : UpdatingEmployee.fname,
                lname : UpdatingEmployee.lname,
                contact : UpdatingEmployee.contact,
                designation : UpdatingEmployee.designation,
                salary : UpdatingEmployee.salary,
            }
          );
        }
      );
  }

  addData(){
    console.log(this.formData);
    // this.newEmployee = new Employee(
    //   "somerandome",
    //   this.formData.value.fname,
    //   this.formData.value.lname,
    //   this.formData.value.salary,
    //   this.formData.value.contact,
    //   this.formData.value.designation);
    // var designationNumber = this.designation.nativeElement.options.selectedIndex;
    // var newEmployee = new Employee(this.fname, this.lname, this.contact, this.salary, designationNumber);
    if(this.editingMode){
      this.EmployeeService.UpdateEmployee(
        this.editingIndex,
        this.editingID,
        this.formData.value.fname,
        this.formData.value.lname,
        this.formData.value.salary,
        this.formData.value.contact,
        this.formData.value.designation
      );
    }

    else {
      this.EmployeeService.addNewEmployee(
        this.formData.value.fname,
        this.formData.value.lname,
        this.formData.value.salary,
        this.formData.value.contact,
        this.formData.value.designation
      );
    }
    this.editingMode = false;
  }

}
