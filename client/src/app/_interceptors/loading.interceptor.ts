import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../_services/busy.service';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);

  //request goes out
  busyService.busy();

  return next(req).pipe(
    //artificial delay
    delay(1000),

    //request is complete - comes back
    finalize(() => {
      busyService.idle();
    })
  );
};
