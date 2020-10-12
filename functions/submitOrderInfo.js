const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async  ({body, headers}) => {

    try {
    // Get info from strip
        const stripeEvent = stripe.webhooks.constructEvent(
            body,
            headers['stripe-signature'],
            process.env.STRIPE_WEBHOOK_SECRET
        );
        console.log(`Created stripe event ${stripeEvent}`);

        if (stripeEvent.type === 'checkout.session.completed') {
            console.log(data.object);
            const items = stripeEvent.data.object.display_items;
            const shippingDetails = stripeEvent.data.object.shipping;
            console.log(`Items: ${items}`);
            console.log(`shippingDetails: ${shippingDetails}`);
            //sendEmail( items, shippingDetails, error => {throw error});
        }

        return { 
            statusCode: 200,
            body: JSON.stringify({ received: true})
        }
    } catch (error) {
        console.log(`failed with ${error}`)
        return { 
            statusCode: 400,
            body: `Webhook error: ${error.message}`
        }
    }


}

const sendEmail = function(items, shippingDetails, callback) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_LOGIN,
            pass: process.env.MAIL_PASSWORD,
        }
    });

    transporter.sendMail({
        from: process.env.MAIL_LOGIN,
        to: process.env.MAIL_TO,
        subject: 'New order from ' + shippingDetails.name,
        //text: event.body
        text: JSON.stringify({items, shipping}, null, 2),
    }, function(error, info) {
    	if (error) {
    		callback(error);
    	} else {
    		callback(null, {
			    statusCode: 200,
			    body: "Ok"
	    	});
    	}
    });
}