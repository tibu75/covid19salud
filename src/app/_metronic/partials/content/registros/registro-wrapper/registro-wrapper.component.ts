import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../core';

@Component({
  selector: 'app-registro-wrapper',
  templateUrl: './registro-wrapper.component.html',
})
export class RegistroWrapperComponent implements OnInit {
  demo: string;
  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    this.demo = this.layout.getProp('demo');
  }
}
