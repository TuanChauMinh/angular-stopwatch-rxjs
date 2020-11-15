import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  minutes: any = '00';
  seconds: any = '00';
  milliseconds: any = '00';
  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('startButton', {static: true, read: ElementRef})
  startbutton!: ElementRef<HTMLDivElement>
}
