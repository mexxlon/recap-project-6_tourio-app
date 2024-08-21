import dbConnect from "@/db/dbConnect";
import Place from "@/models/place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find({});
    if (places) {
      response.status(200).json(places);
    } else {
      response.status(500).json({ message: "Internal Server Error" });
    }
  } else if (request.method === "POST") {
    const place = new Place(request.body);
    const savedPlace = await place.save();

    if (savedPlace) {
      response.status(201).json(savedPlace);
    } else {
      response.status(400).json({ message: "Bad Request" });
    }
  } else {
    response.status(405).json({ message: "Method Not Allowed" });
  }
}
