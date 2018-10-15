import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import { Subscription } from 'rxjs';


import { TagService } from '../services/tag.service';
import { Tag } from '../models/tag.model';
import { Chip } from '../models/chip.model';

@Component({
  selector: 'app-show-tag',
  templateUrl: './show-tag.component.html',
  styleUrls: ['./show-tag.component.css']
})


/*
This component displays the tags currently existing in the database, so
that the user can select from them and filter down the pool of ideas 
that can be presented to them. On Init, the component pulls all tags
from the tags service and maps them into an array of chips. The chip model
contains the tag name and a bool to show if it is selected or not, which 
controls the style class. Selecting or unselecting toggles that bool, and
calls the tag service to add or remove that string to an array of tags
*/

export class ShowTagComponent implements OnInit {

  private sub: Subscription;
  tags: Tag[];
  chips: Chip[];

  selectChip(chip: Chip){
    chip.sel = !chip.sel;
    this.tagService.toggleSelected(chip.name);
  }

  constructor(public tagService: TagService) { }

  ngOnInit() {
    this.tagService.getTags('community');
    this.sub = this.tagService.updateListener().subscribe((tags: Tag[]) => {
          this.chips = tags.map(tags => ({ name: tags.tagname, sel: false}));
      }); 
  }

}










