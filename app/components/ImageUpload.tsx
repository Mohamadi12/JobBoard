"use client";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { Loader } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

const ImageUpload = ({
  name,
  icon: Icon, defaultValue=''
}: {
  name: string;
  icon: React.ComponentType;
  defaultValue?: string; 
}) => {
  const fileInRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(defaultValue);
  const [isUploading, setIsUploading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      setIsUploading(true);
      const file = input.files[0];
      const data = new FormData();
      data.set("file", file);
      const res = await axios.post("/api/upload", data);
      if (res.data.url) {
        setUrl(res.data.url);
        setIsUploading(false);
        setIsImageLoading(true);
      }
    }
  };
  const imgLoading = isUploading || isImageLoading;

  return (
    <>
      <div className="bg-gray-100 rounded-md size-24 inline-flex items-center content-center justify-center">
        {imgLoading && <Loader className="text-gray-400 animate-spin" />}
        {!isUploading && url && (
          <Image
            src={url}
            alt={"uploaded image"}
            width={1024}
            height={1024}
            onLoadingComplete={() => setIsImageLoading(false)}
            className="w-auto h-auto max-w-24 max-h-24"
          />
        )}
        {!imgLoading && !url && (
          <div className="text-gray-400">
            <Icon />
          </div>
        )}
      </div>
      <input type="text" value={url} name={name} />
      <div className="mt-2">
        <input
          type="file"
          ref={fileInRef}
          className="hidden"
          onChange={upload}
        />
        <Button
          variant="soft"
          type="button"
          onClick={() => fileInRef.current?.click()}
        >
          select file
        </Button>
      </div>
    </>
  );
};

export default ImageUpload;
