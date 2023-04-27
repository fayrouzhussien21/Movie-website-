import { MongoClient } from "mongodb";

const movieshandler = async (req, res) => {
  const client = await MongoClient.connect(
    "mongodb://127.0.0.1:27017/moviesdb"
  );
  const db = client.db();
  const moviecollection = db.collection("moviesinfo");
  if (req.method == "POST") {
    let data = req.body;
    moviecollection.insertOne(data);
    res.send(200).json({
      message: "movies sended successfully",
      data: {
        movies: data,
      },
    });
  } else if (req.method == "GET") {
    let data = moviecollection.find({});
    res.send(200).json({
      movies: data,
    });
  }
};

export default movieshandler;
