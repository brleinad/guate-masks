import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Mask, MaskType } from 'src/app/models/mask.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-mask-card',
  templateUrl: './mask-card.component.html',
  styleUrls: ['./mask-card.component.scss']
})
export class MaskCardComponent implements OnInit {
  @Input() mask: Mask;

  constructor(
    private cartService: CartService,
    ) { }

  ngOnInit(): void {
  }

  onAdd2Cart() {
    this.cartService.addItem(this.mask);
  }


  onShare() {
  }

  transformType(maskType: MaskType): string {
    let newMaskType = maskType.toString();
    newMaskType = this.capitalizeFirstLetter(newMaskType);
    if (newMaskType === 'Kids') {
      newMaskType = 'Enfant';
    } else {
      newMaskType = 'Adulte - ' + newMaskType;
    }
    return newMaskType;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
