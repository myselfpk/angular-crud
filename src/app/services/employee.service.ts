import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../models/employee';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private http = inject(HttpClient);

    private apiUrl = 'http://localhost:3000/employees';

    getEmployees(): Observable<Employee[]>
    {
        return this.http.get<Employee[]>(this.apiUrl);
    }

    getEmployeeById(id: number | string): Observable<Employee>{
        return this.http.get<Employee>(`${this.apiUrl}/${id}`);    
    }

    createEmployee(employee: Employee): Observable<Employee>{
        return this.http.post<Employee>(this.apiUrl, employee);
    }

    updateEmployee(id: number | string, employee: Employee): Observable<Employee>{
        return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
    }

    deleteEmployee(id: number | string): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}