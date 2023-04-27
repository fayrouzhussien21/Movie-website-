import React from "react";
import { useRouter } from "next/router";
import { MongoClient } from "mongodb";

const moviesid = (props) => {
  let route = useRouter();
  let mid = route.query.moviesid;
  return (
    <>
      <div>
        <div>movies id is {mid}</div>
      </div>
    </>
  );
};
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb://127.0.0.1:27017/moviesdb"
  );
  const db = client.db();
  const moviecollection = db.collection("moviesinfo");
  let movieid = await moviecollection.find({}, { _id: 1 }).toArray();
  return {
    fallback: true,
    paths: movieid.map((id) => ({
      params: { moviesid: id._id.toString() },
    })),
  };
}
export async function getStaticProps(context) {
  const client = await MongoClient.connect(
    "mongodb://127.0.0.1:27017/moviesdb"
  );
  let movieId = context.params.moviesid;
  const db = client.db();
  let selectedmovie = await db
    .collection("moviesinfo")
    .findOne({ _id: movieId });
  console.log(selectedmovie);
  return {
    props: {
      movieId,
    },
    revalidate: 10,
  };
}

// export async function getServerSideProps(context) {
//   const client = await MongoClient.connect(
//     "mongodb://127.0.0.1:27017/moviesdb"
//   );
//   let movieId = context.params.moviesid;
//   const db = client.db();
//   let selectedmovie = await db
//     .collection("moviesinfo")
//     .findOne({ _id: movieId });
//   console.log(selectedmovie);
//   return {
//     props: {
//       movieId,
//     },
//   };
// }

export default moviesid;
