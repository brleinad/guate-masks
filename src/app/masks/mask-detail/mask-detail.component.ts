import { Component, OnInit, Input } from '@angular/core';
import { Mask } from 'src/app/models/mask.model';

@Component({
  selector: 'app-mask-detail',
  templateUrl: './mask-detail.component.html',
  styleUrls: ['./mask-detail.component.scss']
})
export class MaskDetailComponent implements OnInit {
  @Input() mask : Mask;

  constructor() { }

  ngOnInit(): void {
  }

}
