import { Component, OnInit, Input } from '@angular/core';
import { Mask } from 'src/app/models/mask.model';

@Component({
  selector: 'app-mask-card',
  templateUrl: './mask-card.component.html',
  styleUrls: ['./mask-card.component.scss']
})
export class MaskCardComponent implements OnInit {
  @Input() mask: Mask;

  constructor() { }

  ngOnInit(): void {
  }

}
