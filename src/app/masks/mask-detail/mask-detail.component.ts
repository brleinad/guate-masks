import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mask } from 'src/app/models/mask.model';
import { MasksService } from 'src/app/services/masks.service';

@Component({
  selector: 'app-mask-detail',
  templateUrl: './mask-detail.component.html',
  styleUrls: ['./mask-detail.component.scss']
})
export class MaskDetailComponent implements OnInit {
  mask: Mask;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private maskService: MasksService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const id = +params['id'];
      this.mask = this.maskService.getMaskById(id);
    })
  }

}
