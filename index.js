import express from "express"
import mysql from "mysql"
import cors from "cors"
const app=express()
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"assignment"
})
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("hi")
})
app.get("/getAllNotes",(req,res)=>{
    const q="SELECT * FROM notes"
    db.query(q,(err,data)=>{
        if(err)return res.json(err)
        return res.json(data)
    })
})
app.post("/createNotes",(req,res)=>{
    console.log(req)
    const q="INSERT INTO notes(`title`,`content`,`createdAt`) VALUES (?)"
    const values=[req.body.title,req.body.content,new Date()]
    db.query(q,[values],(err,data)=>{
        if(err)return res.json(err)
        return res.json(data)
    })
})
app.delete("/deleteNotes/:id",(req,res)=>{
    const notesId=req.params.id;
    const q="DELETE FROM notes WHERE id =?"
    db.query(q,[notesId],(err,data)=>{
        if(err)return res.json(err)
        return res.json(data)
    })

})
app.listen(8800,()=>{
    console.log("hiiiiii")
})