import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Subject }         from '../subject';
import { SubjectService }  from '../subject.service';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: [ './subject-detail.component.css' ]
})
export class SubjectDetailComponent implements OnInit {
  @Input() subject: Subject;

  constructor(
    private route: ActivatedRoute,
    private heroService: SubjectService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getSubject(id)
      .subscribe(hero => this.subject = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateSubject(this.subject)
      .subscribe(() => this.goBack());
  }
}