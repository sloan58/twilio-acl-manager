# twilio-acl-manager

This AWS Lambda node.js script monitors the IP address that your SIP domain name resolves to and if the IP does not match what's configured in your Twilio IP Address ACL, it will update the Twilio configs.

This is helpful when trying to place outbound calls to Twilio via SIP trunking when using DHCP with your ISP.

There are a few environment variables needed when deploying with Claudia:

SIP_DOMAIN - Your SIP services domain to monitor

TWILIO_ACL - The Twilio ACL SID
 
TWILIO_SECRET - Your Twilio secret key

TWILIO_SID - Your Twilio SID

TWILIO_SMS_FROM - Your Twilio registered phone number to send SMS messages From:

TWILIO_SMS_TO - The phone number to send SMS messages To:

