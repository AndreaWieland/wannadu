import { Component, OnInit, OnDestroy } from '@angular/core';
import { Idea } from '../models/idea.model';
import { IdeaService } from '../services/idea.service';
import { TagService } from '../services/tag.service';
import { AuthService } from "../services/auth.service";

import { Tag } from '../models/tag.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})


export class DisplayComponent implements OnInit, OnDestroy {
  activeIndex: number;            //holds a random number to pull our idea from array
  pulledIdeas: number[] = [];     //to track which ideas have already been shown
  endOfList: boolean = false;     //boolean control for structural directives
  
  ideas: Idea[] = [];             //true list of ideas pulled from db
  displayideas: Idea[] = [];      //ideas for display, controlled by tag selections
  tags: string[] = []             //received from tagservice
  private ideasub: Subscription;  
  private tagsub: Subscription;
  activenum: number;              //index of our random idea
  firstLogin: boolean = false;

  constructor(public ideaService: IdeaService, 
              public tagService: TagService,
              public authService: AuthService) { }


  ngOnInit() {

    //pull user ideas from db

    this.ideaService.getIdeas('community');                              //THIS NEEDS TO BE UPDATED WITH AUTH USERID
    this.firstLogin =  this.authService.isFirstLogin();

    //subscribes to tag updates. every time a tag selection
    //changes, the sub will re-filter the displayed ideas,
    //reset the end of list counts, and get a random idea.
    //if the array of ideas that meet criterion is empty, will
    //set the endoflist control boolean to prompt restart

    this.tagsub = this.tagService.selUpdateListener()
      .subscribe((tags: string[]) =>{
        this.tags = tags;
        this.filterByTags();
        this.resetList();
        if(this.displayideas.length == 0){ this.endOfList = true;}
      });


    //subscribes to idea updates. updates the list on changes, 
    //filters by the current selected tags, and pulls a random
      
    this.ideasub = this.ideaService.updateListener()
      .subscribe((ideas: Idea[]) => {
        this.ideas = ideas;
        this.filterByTags();
        this.getRandomIdea();
      }); 

    console.log('this is the first login: ' + this.firstLogin);
  }




  ngOnDestroy(){
    this.ideasub.unsubscribe();
    this.tagsub.unsubscribe();
  }




  //sets as visible only those ideas that contain all the tags the user 
  //has selected
  
  filterByTags(){
    this.displayideas = this.ideas.filter(idea => 
      this.containsAll(this.tags, idea.tags));
  }




  //compares array on left to see if all its values are contained
  //in the array on right. in my implementation, the left array will
  //be the array of selected tags from the tag service, and the 
  //right will be the array of tags attached to each idea object.
  //used in a filter function on tag update
  
  containsAll(selectedTags: string[], tagsInIdea: string[]){
    let i= 0;
    for(i = 0; i < selectedTags.length; i++){
      if(!tagsInIdea.includes(selectedTags[i])){
        return false;
      }
    }
    return true;
  }




  //logic behind random idea pulling
  
  getRandomIdea(){
    if(this.pulledIdeas.length < this.displayideas.length){               //while we haven't seen all ideas
      do{
        this.activeIndex = 
        Math.floor(Math.random()*this.displayideas.length);               //get random numbers until we get a fresh one,
      } while(this.pulledIdeas.includes(this.activeIndex))                //which will update our ngIf directives 
      this.pulledIdeas.push(this.activeIndex);                            //mark it as seen
    } else {
      this.endOfList = true;                                              //changes view when we've seen all ideas
    } 
  }




  //removes all elements from pulled numbers array, resets the 
  //view control boolean, chooses a new random idea
  
  resetList(){
    this.pulledIdeas.splice(0, this.pulledIdeas.length);
    this.getRandomIdea();
    this.endOfList = false;
  }




  //needs a confirmation modal
  
  onDelete(ideaId: string){
    this.ideaService.deleteIdea(ideaId);
  }
}



















