import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from "@angular/material";
import { Subscription } from 'rxjs';

import { Idea } from '../models/idea.model';
import { IdeaService } from '../services/idea.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  ideas: Idea[] = []; 
  private sub: Subscription;
  isLoading: boolean = false;
  totalIdeas = 0;
  ideasPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [10, 25, 100];
  minIndex = 0;
  maxIndex = this.ideasPerPage - 1;
  
  constructor(public ideaService: IdeaService) { }

  ngOnInit() {
  	this.isLoading = true;
    this.ideaService.getIdeas('community');
    this.sub = this.ideaService.updateListener().subscribe((ideas: Idea[]) => {
    	  this.isLoading = false;
          this.ideas = ideas;
          this.totalIdeas = ideas.length;

        }); 
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  stealIdea(desc: string, loc: string, site: string, tags: string[]){
  	const clonedIdea = {
        id: null,
        description: desc,
        location: loc,
        website: site,
        author: 'user',             // probably need to move the object creation to the service to i can add userId
        tags: tags                
      }
    this.ideaService.addIdea(clonedIdea);
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.ideasPerPage = pageData.pageSize;
    this.minIndex = (pageData.pageIndex * this.ideasPerPage);
    this.maxIndex = this.minIndex + pageData.pageSize - 1;
  }
}