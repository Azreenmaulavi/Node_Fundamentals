// 8.Creat a node js express server to provide login REST API validate response on any REST client like POSTMAN


const express=require('express')
const bodyParser=require('body-parser')

const app=express()
const port=3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

const users=[
    {
        email:'john@gmail.com',
        password:'123456'
    },
    {
        email:'jane@gmail.com',
        password:'123456'
    }
];

app.post("/login",(req,res)=>
{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({message:"Email and Password are required"})
    }

    const user=users.find(u=>u.email===email && u.password===password)

    if(user){
        res.status(200).json({message:"Login Successful",user})
    }
    else{
        res.status(200).json({message:"Invalid Email or Password"})
    }
});

app.listen(port,()=>
{
    console.log(`Server is running on http://localhost:${port}`);
}
)