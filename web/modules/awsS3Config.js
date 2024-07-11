require('dotenv').config();
const S3=require('aws-sdk/clients/s3')
const fs=require('fs');

const bucketName=process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId=process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey=process.env.AWS_SECRET_ACCESS_KEY;

const s31=new S3({
    region,
    accessKeyId,
    secretAccessKey
})

const uploadFile = async(image,Id)=>{
    //const fileStream = fs.createReadStream(file.path)
    var buf = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""),'base64')
    const uploadParams ={
        Bucket:bucketName,
        Body:buf,
        Key:Id,
        ContentEncoding: 'base64',
        ContentType: 'image/png'
    }
     try{
        const data= await s31.upload(uploadParams).promise();
        console.log(data);
        return data;
     }catch(error){
        console.log(error);
     }    
}

module.exports=uploadFile;