import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";


import { Idea } from '../models/idea.model';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  private ideas: Idea[] = []; 
  private ideasUpdated = new Subject<Idea[]>();
  
  constructor(private http: HttpClient, private router: Router) { }

  updateListener(){
    return this.ideasUpdated.asObservable();
  }

  getIdeas(userId: string){
    const queryParams = `?findUser=${userId}`;
  	this.http.get<{message: string, ideas: any}>
    ('http://localhost:3000/api/ideas' + queryParams)
      .pipe(map((postData) => {
        return postData.ideas.map(idea =>{
          return {
            description: idea.description,
            location: idea.location,
            website: idea.website,
            id: idea._id,
            author: idea.author,
            tags: idea.tags
          }
        })
      }))
      .subscribe(transformedIdeas => {
        this.ideas = transformedIdeas;
        this.ideasUpdated.next([...this.ideas]);
      });
  }

  getIdea(id: string) {
    return this.http.get<{ _id: string; description: string; location: string; website: string, author: string, tags: string[] }>(
      "http://localhost:3000/api/ideas/" + id
    );
  }

  addIdea(idea: Idea){
    this.http.post<{message: string}>('http://localhost:3000/api/ideas', idea)
      .subscribe((postData) => {
        console.log(postData.message);
        this.ideas.push(idea);
        this.ideasUpdated.next([...this.ideas]);
      })
  }

  updateIdea(idea: Idea) {
    this.http
      .put("http://localhost:3000/api/ideas/" + idea.id, idea)
      .subscribe(response => {
        const updatedIdeas = [...this.ideas];
        const oldIdeaIndex = updatedIdeas.findIndex(p => p.id === idea.id);
        updatedIdeas[oldIdeaIndex] = idea;
        this.ideas = updatedIdeas;
        this.ideasUpdated.next([...this.ideas]);
        this.router.navigate(["/do"]);
      });
  }

  deleteIdea(ideaId: string){
    this.http.delete('http://localhost:3000/api/ideas/' + ideaId).subscribe((data) => {
      const updatedIdeas = this.ideas.filter(idea => idea.id !== ideaId);
      this.ideas = updatedIdeas;
      this.ideasUpdated.next([...this.ideas]);
    });
  }
}
















