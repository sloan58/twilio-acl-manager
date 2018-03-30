'use strict';

const dns = require('dns')
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_SECRET;
const client = require('twilio')(accountSid, authToken);

module.exports.fire = (event, context, callback) => {

    // Lookup the sip.karmatek.io IP Address
    dns.lookup(process.env.SIP_DOMAIN, function(err, result) {

        // Get the list of IP Addresses in the Twilio ACL (should only be one)
        client.sip
            .ipAccessControlLists(process.env.TWILIO_ACL)
            .ipAddresses.each(ipAddress => {

            // If the Twilio ACL IP doesn't match
            // the sip.karmatek.io IP, we need
            // to updatethe ACL via Twilio API
            if (ipAddress.ipAddress != result) {

                client.sip.ipAccessControlLists(process.env.TWILIO_ACL)
                    .ipAddresses(ipAddress.sid)
                    .update({
                        ipAddress: result,
                    })
                    .then((ipAddress) => {
                        // The config was updated.  Notify the owner
                        client.messages.create({
                            to: process.env.TWILIO_SMS_TO,
                            from: process.env.TWILIO_SMS_FROM,
                            body: 'twilio-acl-manager: ACL updated with IP ' + result
                        });
                    });
            } else {
                // The config was not updated.  Notify the owner
                client.messages.create({
                    to: process.env.TWILIO_SMS_TO,
                    from: process.env.TWILIO_SMS_FROM,
                    body: 'twilio-acl-manager: No changes detected'
                });
            }
        });
    })
};
