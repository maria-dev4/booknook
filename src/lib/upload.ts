export const uploadImage = async (file: File) => {
  const body = new FormData();
  body.append("image", file);
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    { method: "POST", body }
  );
  const data = await res.json();
  if (!data.success) throw new Error("Image upload failed");
  return data.data.url as string;
};