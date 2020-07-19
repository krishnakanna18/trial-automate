const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/UrCV", {useNewUrlParser: true , useUnifiedTopology: true } );
let websiteSchema=new mongoose.Schema({
    avatar:String,
    template:{
        profession:String,
        tname:String
    },
    menu:[
        {
            title:String,
            href:String
        }
    ],
    Containers:[
        {
            container_id:Number,
            bgImage:String,
            Inner:[
                {
                    component_id:Number,
                    class:String,
                    img:{type:String,default:undefined},
                    Title:String,
                    Sub:{type:String,default:undefined},
                    Desc:String        
                }
            ]
        }
    ]
})
let Website=mongoose.model('Websites',websiteSchema);
// Website.create({
//     avatar:"https://img.icons8.com/color/48/000000/ozil.png",
//     template:{
//         profession:"Dev",
//         tname:"1"
//     },
//     menu:[
//         {
//             title:"Home",
//             href:"#"
//         },
//         {
//             title:"About",
//             href:"#01"
//         },
//         {
//             title:"Projects",
//             href:"#10"
//         },
//         {
//             title:"Contact",
//             href:"#00"
//         },
//         {
//             title:"MEMES",
//             href:"https://reddit.com"
//         }
//     ],
//     Containers:[
//         {
//             container_id:0,
//             bgImage:"https://html.nkdev.info/skylith/assets/images/screenshot-demo-minimal-classic-agency.jpg",
//             Inner:[
//                 {
//                     component_id:1,
//                     Title:"Create Your beautiful Website with skylith",
//                     Sub:"30+ Unique Designs Offered",
//                 },
//                 {
//                     component_id:2,
//                     img:"https://html.nkdev.info/skylith/assets/images/promo-header-demos.png"
//                 }
//             ]
//         },
//         {
//             container_id:1,
//             Inner:[
//                 {
//                     component_id:0,
//                     Sub:"BBBBAAD!",
//                     img:"https://html.nkdev.info/skylith/assets/images/screenshot-demo-minimal-classic-agency.jpg"
//                 },
//                 {
//                     component_id:1,
//                     Sub:"BBBBAAD!",
//                     img:"https://html.nkdev.info/skylith/assets/images/screenshot-demo-dark-creative-agency.jpg"
//                 },
//                 {
//                     component_id:2,
//                     Sub:"BBBBAAD!",
//                     img:"https://html.nkdev.info/skylith/assets/images/screenshot-demo-minimal-carousel-portfolio.jpg"
//                 }
//             ]
//         }
//     ]
// },(err,res)=>{
//     if(err)
//         throw err;
//     else
//         console.log(res);
// })
module.exports=Website;
