import dbConnect from "@/db/dbConnect";
import Place from "@/models/place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  } else if (request.method === "POST") {
    const placeData = request.body;
    await Place.create(placeData);
    response.status(201).json({ status: "Place created" });
  }
  return response.status(405).json({ message: "Method Not Allowed" });
}
