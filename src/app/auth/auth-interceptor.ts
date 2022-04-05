import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenStorageService } from "./token-storage.service";
const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.token.getToken()
    const authRequest = req.clone({
      headers: req.headers.set(TOKEN_HEADER_KEY, "Bearer "+ authToken)
    });
    return next.handle(authRequest);
  }
}
