const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const contentful = require('contentful');

exports.handler = async  ({body, headers}) => {

    try {
    // Get info from strip
        const stripeEvent = stripe.webhooks.constructEvent(
            body,
            headers['stripe-signature'],
            process.env.STRIPE_WEBHOOK_SECRET
        );
        console.log(`Created stripe event ${stripeEvent}`);
        let emailSent = false;


        if (stripeEvent.type === 'checkout.session.completed' ) {
        //&& stripeEvent.payment_status === 'paid') {
            console.log(stripeEvent.data.object);
            console.log(`data: ${JSON.stringify(stripeEvent.data.object)}`);
            sendEmail( stripeEvent.data.object, (error, info) => {console.log(info); console.error(error);});
            unpublishMask(stripeEvent.data.object);
            emailSent = true;
        }

        return { 
            statusCode: 200,
            body: JSON.stringify({ received: true, emailSent: emailSent})
        }
    } catch (error) {
        console.log(`failed with ${error}`)
        return { 
            statusCode: 400,
            body: `Webhook error: ${error}`
        }
    }


}

const sendEmail = function(checkoutSession, callback) {
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
        subject: 'New order from ' + checkoutSession.shipping.name,
        //text: event.body
        text: JSON.stringify({checkoutSession}, null, 2),
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

const unpublishMask = function (checkoutSession) {

    const CONFIG = {
        space: 'lvdm1g7qic0r',
        accessToken: 'DV6VF78OeykSp79IIlQCJyROy-Ah_lLrtZlOhGMJ9Ic',
        contentTypeIds: {
            mask: 'mask'
        }
    }
    const client = contentful.createClient({
        space: CONFIG.space,
        accessToken: CONFIG.accessToken,
    });
    const maskEntries = client.getEntries();
    const purchasedItems = checkoutSession.metadata;

    let index = 0;
    for (item of purchasedItems) {
        masksEntries.filter(maskEntry => {
            maskEntry.id === item[index++];
        });
    }

    client.getSpace('<space_id>')
        .then((space) => space.getEnvironment('<environment_id>'))
        .then((environment) => environment.getEntry('<entry_id>'))
        .then((entry) => entry.unpublish())
        .then((entry) => console.log(`Entry ${entry.sys.id} unpublished.`))
        .catch(console.error)
}