import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html',
    styleUrl: './employee-form.component.css',
    imports: [ReactiveFormsModule, RouterLink],
    standalone: true
})

export class EmployeeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  employeeId: number | string | null = null;
  isEditMode = false;
  loading = false;
  errorMessage = '';

  employeeForm = this.fb.nonNullable.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    email: ['',[Validators.required, Validators.email]],
    department: ['',[Validators.required]],
    salary: [0,[Validators.required, Validators.min(1)]],
    joiningDate: ['',[Validators.required]],
    IsActive: [true]
   });

   ngOnInit(): void{
    this.employeeId = this.route.snapshot.paramMap.get('id');

    if (this.employeeId){
      this.isEditMode = true;
      this.loadEmployee(this.employeeId);
    }
   }

   loadEmployee(id: number | string): void{
    this.loading = true;

    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue({
          name: employee.name,
          email: employee.email,
          department: employee.department,
          salary: employee.salary,
          joiningDate: employee.joiningDate,
          IsActive: employee.IsActive
        });
        this.loading = false;
      },
      error: () => {
        this.errorMessage = "Unable to load employee details.";
        this.loading = false;
      
      }
    });
   }

   saveEmployee(): void {
    if (this. employeeForm.invalid){
      this
      
    }
   }
}
