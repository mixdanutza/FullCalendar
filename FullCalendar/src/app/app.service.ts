import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http"
import "rxjs"
import { Calendarevent } from "./calendarevent";

@Injectable()
export class AppService {

  constructor( private  _http:Http) { }

  readJsonFile(){    
        return this._http.get('assets/source/file.json')
              .map(data=>data.json())
              .toPromise()     
  }
  createEvent(event: Calendarevent){
    
  }

}
