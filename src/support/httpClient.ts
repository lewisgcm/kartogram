import * as Request from 'request';
import { injectable } from 'inversify';

@injectable()
export class HttpClient {
    Get<T>(url: string): Promise<T> {
        return new Promise<T>(
            (success, error) => {
                Request.get(
                    url,
                    {},
                    (error: any, response: any, body: any) => {
                        success(body);
                    }
                );
            }
        )
    }
}
