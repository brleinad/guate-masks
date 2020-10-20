const { isDoStatement } = require('typescript');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_T);


exports.handler = async (event) => {
    const {lineItems, maskIds} = JSON.parse(event.body);
    /*
    console.log('Got items');
    console.log(lineItems);
    console.log('Got mask Ids');
    console.log(maskIds);
    */

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['CA'],
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