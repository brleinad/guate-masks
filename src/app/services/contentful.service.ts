import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';

const CONFIG = {
  space: 'lvdm1g7qic0r',
  accessToken: 'DV6VF78OeykSp79IIlQCJyROy-Ah_lLrtZlOhGMJ9Ic',

  contentTypeIds: {
    mask: 'mask'
  }
}

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken,
  });

  constructor() { }

  getMaskEntries(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.contentTypeIds.mask
    }, query))
    .then(res => res.items);
  }
}
