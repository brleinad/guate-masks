const contentful = require('contentful');

const CONFIG = {
    space: 'lvdm1g7qic0r',
    accessToken: 'DV6VF78OeykSp79IIlQCJyROy-Ah_lLrtZlOhGMJ9Ic',
    //contentTypeIds: {
        //mask: 'mask'
    //}
};

exports.handler = async ({body, headers}) => {

  try {
    console.log('getting masks');
    const client = contentful.createClient(CONFIG);

    const entries = await client.getEntries();

    const masks = entries.items.map(entry => {
      return {
        id: entry.fields.id,
        type: entry.fields.type,
        length: entry.fields.length,
        height: entry.fields.height,
        imageURL: entry.fields.image.fields.file.url
      }


    })

    return {
        statusCode: 200,
        headers: {
          'content-type': 'application/json'},
        body: JSON.stringify(masks, null, 2),
    }
  } catch (error) {
    console.error(error);
    return {
        statusCode: 400,
        body: `error in function ${error}`,
    }
  }

}
