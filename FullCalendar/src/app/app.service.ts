import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http"
import "rxjs"

@Injectable()
export class AppService {

  constructor( private  _http:Http) { }

  readJsonFile(){    
        return this._http.get('assets/source/file.json')
              .map(data=>data.json())
              .toPromise()     
  }

}
