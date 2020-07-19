const express=require("express");
const { response } = require("express");
      app=express();
      bodyParser=require("body-parser");
      fetch=require("node-fetch");
      cors=require("cors");
      mysql=require("mysql");
      mongoose=require("mongoose");
      Website=require("./Schemas/website");
      fs=require("fs");
      path=require("path");
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'public'));
mongoose.connect("mongodb://localhost:27017/UrCV", {useNewUrlParser: true , useUnifiedTopology: true } );
app.use(require('express-session')({
    resave: false,
    secret:"There is a third world",
    saveUninitialized:true,
    cookie : {
        maxAge: 1000* 60 * 60 *24 * 365
    }
}
))
//Middleware to save the previous request
const savePrev=(req,res,next)=>{
      req.session.back=req.url;
      next();
}
const fileToBase64 = (filename, filepath) => {
      return new Promise(resolve => {
      //   var file = new File([filename], filepath);
      //   console.log(file);
        let file1=new File([""],'./index.html')
        var reader = new FileReader();
        // Read file content on file loaded event
        reader.onload = function(event) {
          resolve(event.target.result);
        };
        
        // Convert data to base64 
        reader.readAsDataURL(file);
      });
    };
app.use(savePrev);

//Middleware to check if the user is logged in
const isLoggedin=(req,res,next)=>{
      if(req.session.loggedin===true){
            next();
            res.locals.userid=req.session.userid;
            res.locals.loggedin=true;
      }
      else
            res.redirect(200,"/user/login");

}

//Root API
app.get('/',savePrev,(req,res)=>{
      if(req.session.loggedin===true)
      {
            res.json({
                  loggedin:true
            })
      }
      else
            res.json({
                  loggedin:false
            })      
})

//Sample sites
app.get('/sites/1',savePrev,async (req,res)=>{
      Website.findById("5f144743e0b00b4e394ad56e")
      .then(site=>{
            // console.log(site);
            res.json(site);
      })
})
app.get('/sites/2',savePrev,async (req,res)=>{
      Website.findById("5f144d3667f307549f31cb41")
      .then(site=>{
            // console.log(site);
            res.json(site);
      })
})
// app.get('/sites/1',savePrev,async (req,res)=>{
//       Website.findById("5f0d9e42b0697035f344592e")
//       .then(site=>{
//             console.log(site);
//             res.json(site);
//       })
// })
app.get('/infinite/:id',(req,res)=>{
      let sliced=parseInt(req.params.id);


      let arr=[
            {
                  img:"data:image/jpeg;base64,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",
                  Sub:"1st"
            },
            {
                  img:"data:image/jpeg;base64,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",
                  Sub:"2nd"
            },
            {
                  img:"data:image/jpeg;base64,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",
                  Sub:"3rd",

            }
      ]
      res.json(arr);
})
app.post('/update/:id',(req,res)=>{
      // console.log(req.params.id,req.body.Containers[0].Inner[0].Title,"Insied");
      Website.findByIdAndUpdate(req.params.id,req.body,{new: true, upsert: true, setDefaultsOnInsert: true},(err,res)=>{
            // console.log(err,res.Containers[0].Inner[0].Title,"Otu");
      });
      // console.log(req.url)
      // res.redirect(req.url);
      res.send("Saved");
})

app.get('/gitauth',(req,res)=>{
      console.log(req.query.code,"THe code");
      const code=req.query.code;
      const client_id='ed386413882419f33d05'
      const client_secret='02cebfa889b903c377871f53f29687acad8bcc5e'
      fetch(`https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`,{
            method:'post',
            headers:{
                  accept: 'application/json'
            }
      })
      .then(res=>{
            console.log(res);
            return res.json()})
      .then(res=>{
            // console.log(res);
            // console.log(res.acess_token);
            const accessToken=res.access_token;
            fetch(`https://api.github.com/user`,{
                  headers: {
				// Include the token in the Authorization header
				Authorization: 'token ' + accessToken
			}
            })
            .then(res=>{
                  
                 return res.json()})
            .then(async(res)=>{
                  console.log(res);
                  console.log(res.login);
                  const user=res.login;
                  // let to64=await fileToBase64('index.html','./index.html');
                  const contents = fs.readFileSync(path.join(__dirname,'./app.js'), {encoding: 'base64'});
                  console.log(contents,"THe base64 content")
                  console.log(res,"THE USER");
                  fetch(`https://api.github.com/repos/${user}/trial-automate/contents/app.js`,{
                  method:"put",
                  body:JSON.stringify({
                        message:"Deploy in trial",
                        content:`${contents}`
                  }),
                  headers:{
                        Authorization: 'token ' + accessToken,
                        accept:"application/vnd.github.v3+json"
                  }
            }).then(res=>res.json()).then(res=>{
                  console.log(res);
            }).catch(err=>{
                  console.log(err);
            })                 
            })
            
      }).catch(err=>{
            console.log(err);
      })
      res.redirect('http://localhost:3000/test/Dev')
     
})

app.listen(process.env.PORT||9000,(err)=>{
      if(err)
            throw err;
      else
            console.log("Connected!");

})
