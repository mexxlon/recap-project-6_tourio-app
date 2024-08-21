import dbConnect from "@/db/dbConnect";
import Place from "@/models/place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await Place.findById(id);
    if (!place) {
      return response.status(404).json({ message: "Place Not Found" });
    }
    return response.status(200).json(place);
  } else if (request.method === "PUT") {
    const placeData = request.body;
    await Place.findByIdAndUpdate(id, placeData);
    if (!placeData) {
      return response.status(404).json({ message: "Place Not Found" });
    }
    return response.status(200).json({ status: `Place ${id} updated!` });
  } else if (request.method === "DELETE") {
    const deletedPlace = await Place.findByIdAndDelete(id);
    if (!deletedPlace) {
      return response.status(404).json({ message: "Place Not Found" });
    }
    response.status(200).json({ status: `Place ${id} deleted!` });
  }

  return response.status(405).json({ message: "Method Not Allowed" });
}
