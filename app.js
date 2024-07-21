const express=require("express");
const request = require("request");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    //creating an object of arrays to send data to the server
    const data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    EMAIL: email,
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsondata=JSON.stringify(data);
    const url="https://us14.api.mailchimp.com/3.0/lists/40ab1e45a4";

    //IMP SYNTAX FOR https.request(url,options,callback function)
    //auth --- authentication=apikey
    //method=post

    const options={
        method:"POST",
        auth:"shaurya:e70e096f07da7f4cfa814f5be22f3599-us14"
    }

    //https request
    // creating request constant
    const request= https.request(url,options,function(response){
          console.log(response.statusCode);

          response.on("data",function(data){
               console.log(JSON.parse(data));
          });

          var scode=response.statusCode;
          if(scode==200){
            res.sendFile(__dirname+"/success.html")
            }
            else{
                res.sendFile(__dirname+"/failure.html")
            }
     });
     
     //using stringify data
     //sending request to mailchimp server
     request.write(jsondata);

     request.end();
      
});

app.post("/failure.html",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})



app.listen(3000,function(){
    console.log("server starts at localhost 3000");
    
});




//api key
//e70e096f07da7f4cfa814f5be22f3599-us14

//list id
// 40ab1e45a4