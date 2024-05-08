const {MongoClient}=require('mongodb');
const uri="mongodb://localhost:27017";

async function FetchDataIntoDataBase(){

    const response=await fetch('https://the-vegan-recipes-db.p.rapidapi.com/',{
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '449404d4e5mshb142bbbef2abbb4p11772cjsn6ff669cbffff',
            'X-RapidAPI-Host': 'the-vegan-recipes-db.p.rapidapi.com'
        }
    });
    const res=await response.json();

    console.log('Got response of size: '+res.length);

    const client=new MongoClient(uri);
    await client.connect();

    const db=client.db('recipe');
    const collection=db.collection('all');

    try{
        await collection.insertMany(res.slice(0,98));
    }catch(err){
        console.log(err);
    }

    client.close();

    
}

async function getDetailedCollection(){

    const client=new MongoClient(uri);
    await client.connect();
    const db=client.db('recipe');
    const collection=db.collection('details');
    let Collected_Data=[];
    let count=1;
    try{
        while (count<99){
            const response=await fetch('https://the-vegan-recipes-db.p.rapidapi.com/'+count,{
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '449404d4e5mshb142bbbef2abbb4p11772cjsn6ff669cbffff',
                    'X-RapidAPI-Host': 'the-vegan-recipes-db.p.rapidapi.com'
                }
            });
            const res=await response.json();
            console.log("Fetched id: "+count,res);
            Collected_Data.push(res);
            count++;
        }

        console.log("Collected: "+Collected_Data);

        await collection.insertMany(Collected_Data);
        console.log('Inserted Data');

    }catch(err){
        console.log("\n\nError encounted\n\n");
        console.log(err+count);
        console.log(Collected_Data);
        await collection.insertMany(Collected_Data);
        console.log('Inserted Data in error section');
    }

    client.close();

}

getDetailedCollection();
FetchDataIntoDataBase();