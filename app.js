const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/" , (req , res)=>{
res.sendFile(__dirname + "/signup.html");
});

app.post("/" , (req , res)=>{
const firstName = req.body.fName;
const secondName = req.body.sName;
const emailId = req.body.emailAddress;

const data = {
    members: [
        {
            email_address: emailId,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: secondName
            }
        }
    ]
}
const jsonData = JSON.stringify(data);

const url = "https://us18.api.mailchimp.com/3.0/lists/98b85c8e9f";

const options = {
    method: "POST",
    auth: "Nikita:7c83ea0352a6b22956ef4ab26e6c1471-us18"
}

const request = https.request(url , options ,  (response)=>{

if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");

}else{
    res.sendFile(__dirname + "/failure.html");
}

response.on("data" , (data)=>{
    console.log(JSON.parse(data));
});

});

request.write(jsonData);
request.end();


});

app.listen(process.env.PORT || 3000 , (req ,res)=>{
console.log("Server is running on port 3000");
});

//API Key
//d4b99448d7c7c03db4cb0eb6dd7c7e66-us18

// Audience Id or List Id
//98b85c8e9f