# SimpleCountdown
 
Simple client-side only countdown. Live at https://countdown.markng.com/

You can create countdown links without using the website GUI like this:

1. Create a JSON object like this and turn it into a string: (minify it, ideally)
```json
{
    "eventName": "Event name",
    "unix": <unix time of the event>,
    "createdAt": <unix time of the creation date of the event>
}
```
2. Base64 encode that JSON string
3. Pass it to the countdown website URL with the parameter `countdown=<the base64 encoded JSON string>`.
