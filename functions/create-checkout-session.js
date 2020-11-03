const { isDoStatement } = require('typescript');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const SHIPPING_FEES = {
    upTo1Mask: {
        canada: 'price_1HhReiFQZ3uzVtBw3yxbsZXK',
        usa: 'price_1HhRggFQZ3uzVtBwI5ku2ohE',
        world: 'price_1HhlVDFQZ3uzVtBws8y07Yhl',
    },
    upTo2Mask: {
        canada: 'price_1HhRejFQZ3uzVtBw8Eq0KOvc',
        usa: 'price_1HhRibFQZ3uzVtBwbAbRImtD',
        world: 'price_1HhlVSFQZ3uzVtBw02Z3yg4e',
    },
    upTo4Mask: {
        canada: 'price_1HhReiFQZ3uzVtBwvTAokjJE',
        usa: 'price_1HhlS8FQZ3uzVtBwj9SzC0QW',
        world: 'price_1HhlVrFQZ3uzVtBw8I0MtY2y',
    },
    upTo8Mask: {
        canada: 'price_1HhRejFQZ3uzVtBwMnWU2bXj',
        usa: 'price_1HhlSWFQZ3uzVtBwyE7my0V4',
        world: 'price_1HhlWFFQZ3uzVtBwJRHPxlcf',
    },
    upTo12Mask: {
        canada: 'price_1HhRejFQZ3uzVtBwZLiY0hJ2',
        usa: 'price_1HhlT8FQZ3uzVtBwzvUInOBr',
        world: 'price_1HhlWUFQZ3uzVtBwovbTlwuB',
    },
    upTo16Mask: {
        canada: 'price_1HhRejFQZ3uzVtBw4rWJMd0x',
        usa: 'price_1HhlT8FQZ3uzVtBwzvUInOBr',
        world: 'price_1HhlWUFQZ3uzVtBwovbTlwuB',
    },
    upTo20Mask: {
        canada: 'price_1HhReiFQZ3uzVtBwlfcSF5Gb',
        usa: 'price_1HhlT8FQZ3uzVtBwzvUInOBr',
        world: 'price_1HhlWUFQZ3uzVtBwovbTlwuB',
    }
}

function getShippingFees(numberOfItems, location) {
  let shippingFee = SHIPPING_FEES.upTo4Mask;
  if (numberOfItems <= 20) {
    shippingFee = SHIPPING_FEES.upTo20Mask;
  }
  if (numberOfItems <= 16) {
    shippingFee = SHIPPING_FEES.upTo16Mask;
  }
  if (numberOfItems <= 12) {
    shippingFee = SHIPPING_FEES.upTo12Mask;
  }
  if (numberOfItems <= 8) {
    shippingFee = SHIPPING_FEES.upTo8Mask;
  }
  if (numberOfItems <= 4) {
    shippingFee = SHIPPING_FEES.upTo4Mask;
  }
  console.log('Number of items is ' + numberOfItems);
  console.log('Doing shipping fee ' + shippingFee[location]);
  console.log(location);
  console.log(shippingFee);

  return {price: shippingFee[location], quantity: 1};
}

function calcTotalQuantity(lineItems) {
  let quantity = 0;
  lineItems.forEach(lineItem => {
    quantity += lineItem.quantity
  });
  return quantity;
}

function getAllowedCountries(location) {
  switch(location) {
    case ('canada'):
      return ['CA'];
    case ('usa'):
      return ['US'];
    default:
    return ['AT', 'FR', 'NO', 'IE', 'IT', 'DE'];
  }

}

exports.handler = async (event) => {
    const {lineItems, maskIds, shippingLocation} = JSON.parse(event.body);
    /*
    console.log('Got items');
    console.log(lineItems);
    console.log('Got mask Ids');
    console.log(maskIds);
    */
   console.log('line items are ');
   console.log(lineItems);
   lineItems.push(getShippingFees(calcTotalQuantity(lineItems), shippingLocation));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: getAllowedCountries(shippingLocation),
    },
    success_url: process.env.URL + '/order/success',
    cancel_url: process.env.URL + '/cart',
    line_items: lineItems,
    metadata: maskIds,
  });

  // console.log(session);
  console.log('Created checkout session');

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
  };
};
