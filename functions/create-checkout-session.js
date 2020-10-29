const { isDoStatement } = require('typescript');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const SHIPPING_FEES = {
    upTo1Mask: {
        canada: 'c1',
        usa: 'u1',
        world: 'w1',
    },
    upTo2Mask: {
        canada: 'c2',
        usa: 'u2',
        world: 'w2',
    },
    upTo4Mask: {
        canada: '',
        usa: '',
        world: '',
    },
    upTo8Mask: {
        canada: '',
        usa: '',
        world: '',
    },
    upTo12Mask: {
        canada: '',
        usa: '',
        world: '',
    },
    upTo16Mask: {
        canada: '',
        usa: '',
        world: '',
    },
    upTo20Mask: {
        canada: '',
        usa: '',
        world: '',
    }
}

function getShippingFees(numberOfItems, location) {
  let shippingFee = SHIPPING_FEES.upTo1Mask;
  if (numberOfItems <= 20) {
    shippingFee = SHIPPING_FEES.upTo20Mask;
  }
  if (numberOfItems <= 16) {
    shippingFee = SHIPPING_FEES.upTo216ask;
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
  if (numberOfItems <= 2) {
    shippingFee = SHIPPING_FEES.upTo2Mask;
  }

  return shippingFee[location];

}

exports.handler = async (event) => {
    const {lineItems, maskIds, shippingLocation} = JSON.parse(event.body);
    /*
    console.log('Got items');
    console.log(lineItems);
    console.log('Got mask Ids');
    console.log(maskIds);
    */
   lineItems.push(getShippingFees(lineItems.length, shippingLocation));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['CA', 'US', 'AT', 'IE', 'IT', 'DE'],
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
      // publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
  };
};
