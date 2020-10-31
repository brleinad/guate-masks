import { Component, OnInit } from '@angular/core';
import { Mask } from '../../models/mask.model';
import { MasksService } from '../../services/masks.service';

const MAX_DISPLAYED = 3;

@Component({
  selector: 'app-masks',
  templateUrl: './masks.component.html',
  styleUrls: ['./masks.component.scss']
})
export class MasksComponent implements OnInit {

  allMasks: Mask[];

  adultMasks: Mask[];
  displayedAdultMasks: Mask[];
  adultMasksDisplayed = 0;

  kidsMasks: Mask[];
  displayedKidsMasks: Mask[];
  kidsMasksDisplayed = 0;

  constructor(
    private masksService: MasksService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.allMasks = await this.masksService.getMasks();
    this.adultMasks = this.allMasks.filter(mask => mask.isAdult());
    this.kidsMasks = this.allMasks.filter(mask => !mask.isAdult());

    this.onAdultsScrollDown();
    this.onKidsScrollDown();

  }


  onAdultsScrollDown(): void {
    this.adultMasksDisplayed = Math.min(this.adultMasks.length, this.adultMasksDisplayed + MAX_DISPLAYED);
    this.displayedAdultMasks = this.adultMasks.slice(0, this.adultMasksDisplayed);
    console.log('Displaying masks :');
    console.log(this.displayedAdultMasks);
  }

  onKidsScrollDown(): void {
    this.kidsMasksDisplayed = Math.min(this.kidsMasks.length, this.kidsMasksDisplayed + MAX_DISPLAYED);
    this.displayedKidsMasks = this.kidsMasks.slice(0, this.kidsMasksDisplayed);
    console.log('Displaying masks :');
    console.log(this.displayedKidsMasks);
  }

}
