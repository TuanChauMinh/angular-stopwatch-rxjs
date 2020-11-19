import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map, mapTo, scan, startWith, switchMap, tap } from 'rxjs/operators';
import { fromEvent, merge, interval, NEVER } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements AfterViewInit {


  minutes: any = '00';
  seconds: any = '00';
  milliseconds: any = '00';
  constructor() { }
  ngAfterViewInit(): void {

    var getElem = (id: string): HTMLElement => document.getElementById(id);
    var fromClick = (id: string) => fromEvent(getElem(id), 'click');
    var fromClickAndMapTo = (id: string, obj: {}) => fromClick(id).pipe(mapTo(obj));
    var fromClickAndMap = (id: string, fn: (_) => {}) => fromClick(id).pipe(map(fn));
    var setValue = (val: number) => getElem('counter').innerText = val.toString();
    var getVal = (id: string): number => parseInt((getElem(id))['value']);
    var events$ =
    merge(
    fromClickAndMapTo('start', { count: true }),
    fromClickAndMapTo('pause', { count: false }),
    fromClickAndMapTo('reset', { value: 0 }),
    );

    var stopWatch$ = events$.pipe(
      startWith({ count: false, speed: 1000, value: 0, countup: true, increase: 1 }),
      scan((state: State, curr): State => ({ ...state, ...curr }), {}),
      tap((state: State) => setValue(state.value)),
      switchMap((state: State) => state.count
        ? interval(state.speed)
          .pipe(
            tap(_ => state.value += state.countup ? state.increase : -state.increase),
            tap(_ => setValue(state.value))
          )
        : NEVER)
    );
    stopWatch$.subscribe();

  }

}

interface State {
  count: boolean;
  countup: boolean;
  speed: number;
  value: number;
  increase: number;
}
