import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import { Subscription } from 'rxjs';


import { Tag } from '../models/tag.model';
import { TagService } from '../services/tag.service';


@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})


export class AddTagComponent implements OnInit {
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private tags: string[] = [];
  private tagsub: Subscription;


  constructor(public tagService: TagService) { }

  ngOnInit() {
    this.tagsub = this.tagService.entryUpdateListener()
      .subscribe((tags: string[]) =>{
        this.tags = tags;
      });
  }

  
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    
    this.tagService.addOneEnteredTag(value);
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string){
    this.tagService.removeOneEnteredTag(tag);
  }
}

