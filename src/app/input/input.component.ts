import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';


import { Idea } from '../models/idea.model';
import { IdeaService } from '../services/idea.service';
import { TagService } from '../services/tag.service';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  showDetails: boolean = false;
  private mode = 'create';
  private ideaId: string;
  currentIdea: Idea;
  inputTags: string[] =[];
  
  ideas: Idea[];
  private tagsub: Subscription;


  constructor(public ideaService: IdeaService, 
              public route: ActivatedRoute, 
              public tagService: TagService) { }

  ngOnInit() {
    this.tagService.getTags('community');
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('ideaId')){
        this.mode = 'edit';
        this.ideaId = paramMap.get('ideaId');
        this.ideaService.getIdea(this.ideaId).subscribe(response => {
          this.currentIdea = {id: response._id, description: response.description, location: response.location, website: response.website, author: response.author, tags: response.tags};
          this.inputTags = response.tags;
        });
      } else{
        this.mode = 'create';
        this.ideaId = null;
      }
    });

    this.tagsub = this.tagService.entryUpdateListener()
      .subscribe((tags: string[]) =>{
        this.inputTags = tags;
      });
  }

  onShowDetails(){
  	this.showDetails === false ? this.showDetails = true : this.showDetails = false;
  }

  addTags(){
    this.tagService.pushTags(this.inputTags);
  }


  onSave(form: NgForm){
    
    if(form.invalid){
      return;
    } else {
      const newIdea = {
        id: null,
        description: form.value.description,
        location: form.value.location,
        website: form.value.website,
        author: 'community',
        tags: this.inputTags
      }
      if(this.mode == 'create'){
        this.ideaService.addIdea(newIdea);
      }
      if(this.mode == 'edit'){
        newIdea.id = this.ideaId;
        this.ideaService.updateIdea(newIdea);
      }
      this.tagService.pushTags(this.inputTags);
      this.tagService.clearEnteredTags();
      form.resetForm();
    }
  }

}
