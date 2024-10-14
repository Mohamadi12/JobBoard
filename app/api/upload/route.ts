import { app } from "@/app/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    // Vérification que file est bien un File
    if (!(file instanceof File)) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
      });
    }

    const storage = getStorage(app); // Initialisation de Firebase Storage
    const storageRef = ref(storage, `images/${file.name}`); // Référence du fichier dans Firebase

    const arrayBuffer = await file.arrayBuffer(); // Convertir le fichier en buffer
    const bytes = new Uint8Array(arrayBuffer);

    // Upload du fichier sur Firebase Storage
    await uploadBytes(storageRef, bytes, { contentType: file.type });
    const downloadURL = await getDownloadURL(storageRef); // URL de l'image uploadée

    return new Response(JSON.stringify({ url: downloadURL }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error uploading file:", error); // Pour déboguer
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
}
