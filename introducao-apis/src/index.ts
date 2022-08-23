import express, { Request, Response, Express, request } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import { users } from "./data";

const app: Express = express();
app.use(express.json());
app.use(cors());

app.get("/", (request: Request, response: Response) => {
  response.send("Hello, world!🥳");
});

app.get("/users", (request: Request, response: Response) => {
  if (request.headers.authorization === "adriane") {
    response.send("A authorization vale: Adriane");
  } else {
    response.send("A authorization não vale valor");
  }
});

app.get("/body", (request: Request, response: Response) => {
  const authorization = request.body.authorization;
  if (authorization === "adriane") {
    response.send("A authorization vale: Adriane");
  } else {
    response.send("A authorization não vale valor");
  }
});

app.get("/query", (request: Request, response: Response) => {
  if (request.query.authorization === "adriane") {
    response.send("A authorization vale: Adriane");
  } else {
    response.send("A authorization não vale valor");
  }
  // https://endereco-da-api.com/query?authorization=adriane)
});

app.get("/params/:age", (request: Request, response: Response) => {
  if (Number(request.params.agen) % 2 === 0) {
    response.send("Sua idade é par");
  } else {
    response.send("Sua idade é impar");
  }
  // (ex: https://endereco-da-api.com/params/1)
});

app.get("/allplaylists", (request: Request, response: Response) => {
  const playlists = users
    .map((playlist) => {
      return playlist.playlists;
    })
    .flat(1);
  response.send(playlists);
});

app.get("/tracks", (request: Request, response: Response) => {
  const playlists = users
    .map((playlist) => {
      return playlist.playlists;
    })
    .flat(1);

  const tracks = playlists
    .map((track) => {
      return track.tracks;
    })
    .flat(1);
  response.send(tracks);
});

app.delete("/playlist/:userId", (request: Request, response: Response) => {
  const userId = request.params.userId;
  const playlists = users.map((user) => {
    if (user.id === userId) {
      return {
        ...user,
        playlists: [],
      };
    }
    return user;
  });
  response.send(playlists);
});

app.delete("/tracks/:playlistId", (request: Request, response: Response) => {
    const playlistId = request.params.playlistId;

    const playlists = users.map((playlist)=>{
        return playlist.playlists.map((track)=> {
            if(track.id === playlistId){
                return {
                    ... track, 
                    tracks: []
                }
            }
            return track
    
        })
    })
  response.send(playlists);
});

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost: ${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
