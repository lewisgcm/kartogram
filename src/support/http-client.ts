import * as Request from 'request';
import { injectable } from 'inversify';
import { Observable, Observer } from 'rxjs';

const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi11c2VyLXRva2VuLWtwdDVoIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluLXVzZXIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiIxY2RlNTE4Ni1kNDZhLTExZTgtYjJmNi0wMjUwMDAwMDAwMDEiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06YWRtaW4tdXNlciJ9.w6ic2vWPsDwY5isRVbI-vBuGg0oGrDIa7yghF4cvODwMMZlOcI0fUw4RforpHXX3vo4AZZbdVToAj4b0X7ZyPQ5QhabhYHwoyneHuD2kyMPYiK4ct3RYOW_Tgg3ZpOLAh5cylImFVW4GaFIV49TBd1cE_se4LuVCHrxhGovyQgNWISEvDinVAto7B6AbfFmzLyxH9T1orqLzPwbctRGYdNxGZRXbxWlVHGPLpFfSN3JDK25HFF13A0GrvN9UWyX7015yb44QZxMob9hV4oL4cTaBlNqBRHfZQ399KBXcARGUfSTJjaWAcAJdHU_rh9t95wLYxC-tzdSqc4bpYhXo3g';

@injectable()
export class HttpClient {
    Get<T>(url: string): Observable<T> {
        return Observable.create(
            (observer: Observer<T>) => {
                try {
                    Request.get(
                        url,
                        {
                            strictSSL: false,
                            auth: {
                                bearer: token
                            }
                        },
                        (error: any, response: any, body: any) => {
                            if (!error && response.statusCode == 200) {
                                observer.next( JSON.parse( body ) );
                                observer.complete();
                            } else {
                                observer.error( error || response );
                            }
                        }
                    );
                } catch( e ) {
                    observer.error( e );
                }
            }
        );
    }
}
