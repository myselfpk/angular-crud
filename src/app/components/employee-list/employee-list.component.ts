import {Component, OnInit, inject} from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.css',
    imports: [RouterLink],
    standalone: true
})

export class EmployeeListComponent implements OnInit{
    private employeeService = inject(EmployeeService);

    employees: Employee[] = [];
    loading = false;
    errorMessage = '';

    ngOnInit(): void{
        this.loadEmployees();
    }

    loadEmployees(): void{
        this.loading = true;

        this.employeeService.getEmployees().subscribe({
            next: (data) => {
                this.employees = data;
                this.loading = false;
            },
            error: () => {
                this.errorMessage = "Unable to load employee records.";
                this.loading = false;
            }
        });
    }

    deleteEmployee(id: number | string | undefined): void{
        if (!id){
            return;
        }

        const confirmDelete = confirm("Are you sure you want to delete this employee?");

        if (!confirmDelete){
            return;
        }

        this.employeeService.deleteEmployee(id).subscribe({
            next: () => {
                this.loadEmployees();
            },
            error: () =>{
                this.errorMessage = 'Unable to delete employee.';
            }
        });
    }
}