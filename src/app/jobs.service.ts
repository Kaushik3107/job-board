import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private apiUrl = 'https://hacker-news.firebaseio.com/v0/item';
  pageSize = 6;
  currentPage = 1;

  constructor(private http: HttpClient) {}

  getJobs(): Observable<number[]> {
    const url = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;
    return this.http.get<number[]>(url);
  }

  loadMoreJobs(): Observable<number[]> {
    this.currentPage++;
    return this.getJobs();
  }

  getJobDetails(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}.json`;
    return this.http.get<any>(url);
  }
}
