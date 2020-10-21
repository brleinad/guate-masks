import { Injectable } from '@angular/core';
import { Mask } from '../models/mask.model';
import { ContentfulService } from './contentful.service';
import { Entry } from 'contentful';

@Injectable({
  providedIn: 'root'
})
export class MasksService {

  masks: Mask[] = [];
  constructor(private contentfulService: ContentfulService) { 

  }

  async getMasks(): Promise<Mask[]> {
    this.masks = [];
    const entries = await this.contentfulService.getMaskEntries();
    this.masks = await entries.map(entry => this.entry2mask(entry));
    return this.masks;
  }

  getMaskById(id: number): Mask {
    this.getMasks();
    return this.masks.find(mask => mask.id == id);
  }

  entry2mask(entry: Entry<any>): Mask {
    // console.log(entry.fields);
    return new Mask(
        entry.fields.id,
        entry.fields.type,
        entry.fields.length,
        entry.fields.height,
        entry.fields.image.fields.file.url
         );
  }
}
