import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  jobIds!: number[];
  jobs: any[] = [];
  showLoadMore = true;

  constructor(private jobService: JobsService) {}

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.jobService.getJobs().subscribe((ids: number[]) => {
      this.jobIds = ids.slice(0, this.jobService.pageSize);
      this.loadJobDetails();
      console.warn(this.jobIds);
    });
  }

  loadMore() {
    this.jobService.loadMoreJobs().subscribe((ids: number[]) => {
      this.jobIds = this.jobIds.concat(ids.slice(0, this.jobService.pageSize));
      this.loadJobDetails();
      console.warn(this.jobIds);
    });
  }

  loadJobDetails() {
    this.jobs = [];
    const jobsToFetch = this.jobIds.slice(0, this.jobService.pageSize);
    jobsToFetch.forEach((id) => {
      this.jobService.getJobDetails(id).subscribe((job) => {
        this.jobs.push(job);
      });
      console.warn(this.jobs);
    });

    this.showLoadMore = this.jobIds.length > this.jobs.length; //hide button if no job post
  }

  openJobDetails(url: string) {
    window.open(url, '_blank');
  }
}
