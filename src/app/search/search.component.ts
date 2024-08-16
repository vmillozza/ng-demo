import { Component, OnInit } from '@angular/core';
import { Person, SearchService } from '../shared';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  query: string = '';
  searchResults: Person[] = [];

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    const params = this.route.snapshot.params;
    console.log("params['term']=>" + params['term']);
    
    // Verifica se 'term' esiste nei parametri
    if (params['term']) {
      this.query = decodeURIComponent(params['term']);
    }

    console.log('query=>' + this.query);

    // Esegui la ricerca anche se la query è vuota
    this.searchService.search(this.query).subscribe((results: Person[]) => {
      this.searchResults = results;
      console.log('searchResults=>', this.searchResults);
    });
  }
}
