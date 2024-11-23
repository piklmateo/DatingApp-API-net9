import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toast = inject(ToastrService);

  return next(req).pipe(
    catchError(err => {
      if(err) {
        switch(err.status) {
          case 400:
            if(err.err.errors) {
              const modalStateErrors = [];
              for(const key in err.error.errors) {
                if(err.error.errors[key]) {
                  modalStateErrors.push(err.error.errors[key]);
                }
              }
              throw modalStateErrors.flat();
            } else {
              toast.error(err.error, err.status);
            }
            break;
          case 401:
            toast.error("Unauthorized", err.error);
            break;
          case 404:
            router.navigateByUrl("/not-found");
            break;
          case 500:
            const navigationExtras: NavigationExtras = {state: {error: err.error}};
            router.navigateByUrl("/server-error", navigationExtras);
            break;
          default:
            toast.error("Something unexpected went wrong...");
            break;
        }
      }
      throw err;
    })
  )
};
