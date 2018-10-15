import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Tag } from '../models/tag.model';


@Injectable({
  providedIn: 'root'
})

export class TagService {
  private tags: Tag[] = []; 
  private selectedTags: string[] = [];
  private enteredTags: string[] = [];
  private tagsUpdated = new Subject<Tag[]>();
  private selectionsUpdated = new Subject<string[]>();
  private entersUpdated = new Subject<string[]>();

  constructor(private http: HttpClient) { }

  updateListener(){return this.tagsUpdated.asObservable();}

  selUpdateListener(){ return this.selectionsUpdated.asObservable();}

  entryUpdateListener() { return this.entersUpdated.asObservable();}


  toggleSelected(tag: string){
  	if(!this.selectedTags.includes(tag)){
  		this.selectedTags.push(tag);
  	} else {
  		this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
  	}
  	this.selectionsUpdated.next([...this.selectedTags]);
  }

  addOneEnteredTag(tag: string){
  	let val = (tag || '').trim().toLowerCase();
    if (val && !this.enteredTags.includes(val)) {
      this.enteredTags.push(val);
    }
    this.entersUpdated.next([...this.enteredTags]);
  }
  
  removeOneEnteredTag(tag: string){
    const index = this.enteredTags.indexOf(tag);

    if (index >= 0) {
      this.enteredTags.splice(index, 1);
    }
    this.entersUpdated.next([...this.enteredTags]);
  }

  clearEnteredTags(){
  	this.enteredTags = [];
  	this.entersUpdated.next([...this.enteredTags]);
  }


  pushTags(newtags: string[]){

  	for(var tag of newtags) {
  		var i = this.findIndex(tag);
  		if(i == -1){
  			const newTag = {
		        id: null,
		        tagname: tag,
		        count: 1,
		        author: 'community'
		    }
		 	this.addTag(newTag);
  		} else {
  			const newTag = {
		        id: this.tags[i].id,
		        tagname: tag,
		        count: this.tags[i].count +1,
		        author: this.tags[i].author
		    }
		    this.updateTag(newTag);
  		}
  	}
  }


  findIndex(newtag: string){
    for(var tag in this.tags){
      if(newtag === this.tags[tag].tagname){
        return tag;
      }
    }
    return -1;
  }

  getTags(userId: string){
    const queryParams = `?findUser=${userId}`;
  	this.http.get<{message: string, tags: any}>
    ('http://localhost:3000/api/tags' + queryParams)
      .pipe(map((resData) => {
        return resData.tags.map(tag =>{return { tagname: tag.tagname, count: tag.count, id: tag._id, author: tag.author }})
      }))
      .subscribe(transformedTags => {
        this.tags = transformedTags;
		this.tags.sort((a, b) => {
            return b.count - a.count;
          });
        this.tagsUpdated.next([...this.tags]);
      });
  }

  addTag(tag: Tag){
    this.http.post<{message: string}>('http://localhost:3000/api/tags', tag)
      .subscribe((tagData) => {
        console.log(tagData.message);
        this.tags.push(tag);
        this.tagsUpdated.next([...this.tags]);
      })
  }

  updateTag(tag: Tag) {
    this.http
      .put("http://localhost:3000/api/tags/" + tag.id, tag)
      .subscribe(response => {
        console.log(response);
        this.getTags('community');
        this.tagsUpdated.next([...this.tags]);
      });
  }

  deleteTag(tagId: string){
    this.http.delete('http://localhost:3000/api/tags/' + tagId).subscribe((data) => {
      const updatedTags = this.tags.filter(tag => tag.id !== tagId);
      this.tags = updatedTags;
      this.tagsUpdated.next([...this.tags]);
    });
  }
}
