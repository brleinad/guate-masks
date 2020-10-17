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

  constructor(
    private masksService: MasksService
  ) { 
  }

  async ngOnInit() {
    this.masks = await this.masksService.getMasks();
    console.log(this.masks);
  }

}
