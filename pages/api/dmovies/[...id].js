import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
const movieshandler = async (req, res) => {
  let { id } = req.query;
  id = id[0];
  console.log(id);
  let objid = new ObjectId(id);
  const client = await MongoClient.connect(
    "mongodb://127.0.0.1:27017/moviesdb"
  );
  const db = client.db();
  const moviecollection = db.collection("moviesinfo");
  if (req.method == "DELETE") {
    console.log(objid);
    let deleted = moviecollection.deleteOne({ _id: objid });
    res.status(200).json({ deleted });
  }
};

export default movieshandler;
