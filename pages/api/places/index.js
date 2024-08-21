import dbConnect from "@/db/dbConnect";
import Place from "@/models/place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const place = await Place.find({});

    response.status(200).json(place);
  } else {
    response.status(405).json({ message: "Failed" });
  }
}
