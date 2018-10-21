import Axios, * as axios from 'axios';
import { Observable, Observer } from 'rxjs';

export class HttpClient {
    Get<T>(url: string): Observable<T> {
        return Observable.create(
            (observer: Observer<T>) => {
                Axios.get<T>(
                    url
                ).then(
                    ( response ) => {
                        observer.next( response.data );
                        observer.complete();
                    }
                ).catch(
                    (error) => {
                        observer.error( error );
                    }
                )
            }
        );
    }
}