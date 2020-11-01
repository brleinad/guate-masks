import { Component, OnInit } from '@angular/core';
import { Mask } from '../../models/mask.model';
import { MasksService } from '../../services/masks.service';
import { environment } from 'src/environments/environment';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

const MAX_DISPLAYED = 10;

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

  showSmall = true;
  showMedium = true;
  showLarge = true;

  displayedSize = 0;

  constructor(
    private masksService: MasksService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.allMasks = await this.masksService.getMasks();
    this.adultMasks = this.allMasks.filter(mask => mask.isAdult());
    this.kidsMasks = this.allMasks.filter(mask => !mask.isAdult());

    this.displayedAdultMasks = this.adultMasks;
    this.onAdultsScrollDown();
    this.onKidsScrollDown();

  }


  onAdultsScrollDown(): void {
    this.adultMasksDisplayed = Math.min(this.adultMasks.length, this.adultMasksDisplayed + MAX_DISPLAYED);
  }

  onKidsScrollDown(): void {
    this.kidsMasksDisplayed = Math.min(this.kidsMasks.length, this.kidsMasksDisplayed + MAX_DISPLAYED);
    this.displayedKidsMasks = this.kidsMasks.slice(0, this.kidsMasksDisplayed);
  }

  onChangeSize(): void {
    // ghetto debouncing
    setTimeout(() => {
      this.changeSize();
    }, 400);
  }

  changeSize(): void {
    this.displayedAdultMasks = this.adultMasks.filter(mask => {
      return (mask.isSmall() && this.showSmall) ||
            (mask.isMedium() && this.showMedium) ||
            (mask.isLarge() && this.showLarge);
    })
  }

}
