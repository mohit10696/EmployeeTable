import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  DataAdded = new EventEmitter<Employee[]>();
  startedEditing = new Subject<number>();
  //preDefineEmployee = new Employee('mohti','sojitra','1323','8978','developer');
  public EmployeeArray: Employee[] = [];
  API = 'https://testing-f7da7.firebaseio.com/EmployeeDetails';
  postfix = '.json';



  UpdateEmployee(index, id, fname, lname, salary, contact, designation) {
    var UpdatedEmployee = new Employee(id, fname, lname, salary, contact, designation);
    this.Http.put(
      this.API+'/'+id+'.json',
      UpdatedEmployee
      ).subscribe(responce => {
        console.log(responce);
      });
    this.EmployeeArray[index] = UpdatedEmployee;
    console.log(UpdatedEmployee);

  }



  constructor(private Http: HttpClient) {
    //this.EmployeeArray.push(new Employee(,'fname','lnaem','100','123','developer'));
    this.Http
    .get<{ [key:string]:Employee }>(this.API+this.postfix
      ).subscribe(
      responce =>  {
        // tslint:disable-next-line: forin
        for (const key in responce){
          var newEmployee = new Employee(
            key,
            responce[key].fname,
            responce[key].lname,
            responce[key].contact,
            responce[key].salary,
            responce[key].designation);
          console.log(newEmployee);
          this.EmployeeArray.push(newEmployee);
           //console.log(responce[key]);
        }
      }
    );
  }





  addNewEmployee(fname, lname, salary, contact, designation){
   // this.EmployeeArray.push(userdata);
   // console.log(userdata);
   // this.DataAdded.emit(this.EmployeeArray);
      var userdata = {
        fname, lname, salary, contact, designation
      };
      this.Http
      .post(
         this.API+this.postfix,
         userdata
      )
      .subscribe(responseData => {
        console.log("responce when push", responseData);
        this.EmployeeArray.push(new Employee(
          responseData['name'],
          fname,
          lname,
          salary,
          contact,
          designation));
        this.DataAdded.emit(this.EmployeeArray);
      });

  }
  // getAllList() {
  //   return Employee;
  // }
  getEmployee(index){
    return this.EmployeeArray[index];
  }

  delete(i: any) {
    this.Http.delete(this.API+'/'+this.EmployeeArray[i].id+'.json').subscribe();
    this.EmployeeArray.splice(i);
  }
}
