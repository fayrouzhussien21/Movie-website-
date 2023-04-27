import Movieitems from "../components/Movieitems";
import { MongoClient } from "mongodb";
const home = (props) => {
  return <Movieitems movies={props.movies}></Movieitems>;
};
export async function getStaticProps() {
  // let res = await fetch("http://localhost:9000/movies");
  // let movies = await res.json();
  const client = await MongoClient.connect(
    "mongodb://127.0.0.1:27017/moviesdb"
  );
  const db = client.db();
  const moviecollection = db.collection("moviesinfo");
  let movies = await moviecollection.find({}).toArray();
  return {
    props: {
      movies: movies.map((movies) => ({
        overview: movies.overview,
        poster_path: movies.poster_path,
        id: movies._id.toString(),
        title: movies.title,
      })),
    },
  };
}

export default home;
