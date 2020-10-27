import { Component, OnInit } from '@angular/core';
import { Mask } from '../../models/mask.model';
import { MasksService } from '../../services/masks.service';

@Component({
  selector: 'app-masks',
  templateUrl: './masks.component.html',
  styleUrls: ['./masks.component.scss']
})
export class MasksComponent implements OnInit {

  masks: Mask[];
  adultMasks: Mask[];
  kidsMasks: Mask[];

  constructor(
    private masksService: MasksService
  ) {
  }

  async ngOnInit() {
    this.masks = await this.masksService.getMasks();
    this.adultMasks = this.masks.filter(mask => mask.isAdult());
    this.kidsMasks = this.masks.filter(mask => !mask.isAdult());
    console.log(this.masks);
  }

}
