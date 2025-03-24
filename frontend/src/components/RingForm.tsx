import { useEffect, useRef, useState } from "react";
import { Ring } from "../types/ring";
import { Check, Paperclip, PlusCircle, Save } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ringSchema = z.object({
  name: z.string().min(1, "O nome do anel é obrigatório"),
  power: z.string().min(1, "O poder do anel é obrigatório"),
  bearer: z.string().min(1, "O portador do anel é obrigatório"),
  forger: z.string().min(1, "O forjador do anel é obrigatório"),
});

type RingFormData = z.infer<typeof ringSchema>;

interface RingFormProps {
  ring?: Ring;
  image: File | null;
  setImage: (image: File) => void;
  onSubmit: (ring: Omit<Ring, "id">) => void;
  onCancel: () => void;
}

export function RingForm({
  ring,
  image,
  setImage,
  onSubmit,
  onCancel,
}: RingFormProps) {
  const fileInputRef = useRef<any>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [hasNewImage, setHasNewImage] = useState(false);

  const handleFileUpload = () => {
    fileInputRef?.current?.click();
  };

  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      setImage(file);
      setHasNewImage(true);
      setImageError(null);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RingFormData>({
    resolver: zodResolver(ringSchema),
    defaultValues: {
      name: "",
      power: "",
      bearer: "",
      forger: "",
    },
  });

  const onSubmitForm: SubmitHandler<RingFormData> = (data) => {
    if (!image && !ring) {
      setImageError("A foto do anel é obrigatória");
      return;
    }

    onSubmit({
      ...data,
      imageUri:
        hasNewImage && image
          ? URL.createObjectURL(image)
          : ring?.imageUri || "",
    });
  };

  useEffect(() => {
    if (ring) {
      setValue("name", ring.name);
      setValue("power", ring.power);
      setValue("bearer", ring.bearer);
      setValue("forger", ring.forger);
      setHasNewImage(false);
    }
  }, [ring, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        {ring ? "Atualizar Anel" : "Criar Novo Anel"}
      </h2>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nome do Anel
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          placeholder="Digite o nome do anel"
          className="mt-1 block w-full rounded-md border-black border-opacity-20 border-[1px] h-10 sm:text-sm pl-2 outline-none"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="power"
          className="block text-sm font-medium text-gray-700"
        >
          Poder
        </label>
        <textarea
          id="power"
          {...register("power")}
          rows={3}
          placeholder="Digite o poder do anel"
          className="mt-1 block w-full rounded-md border-black border-opacity-20 border-[1px] min-h-16 sm:text-sm p-2 outline-none"
        />
        {errors.power && (
          <p className="text-red-500 text-sm mt-1">{errors.power.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="bearer"
          className="block text-sm font-medium text-gray-700"
        >
          Portador
        </label>
        <input
          type="text"
          id="bearer"
          {...register("bearer")}
          placeholder="Digite o nome do portador do anel"
          className="mt-1 block w-full rounded-md border-black border-opacity-20 border-[1px] h-10 sm:text-sm pl-2 outline-none"
        />
        {errors.bearer && (
          <p className="text-red-500 text-sm mt-1">{errors.bearer.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="forger"
          className="block text-sm font-medium text-gray-700"
        >
          Forjado Por
        </label>
        <input
          type="text"
          id="forger"
          {...register("forger")}
          placeholder="Digite o nome do forjador do anel"
          className="mt-1 block w-full rounded-md border-black border-opacity-20 border-[1px] h-10 sm:text-sm pl-2 outline-none"
        />
        {errors.forger && (
          <p className="text-red-500 text-sm mt-1">{errors.forger.message}</p>
        )}
      </div>

      <input
        type="file"
        onChange={handleFileSelect}
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
      />
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={handleFileUpload}
          className="flex gap-2 h-9 w-28 rounded-md bg-[#4f46e5] items-center justify-center"
        >
          {!image && !ring?.imageUri ? (
            <Paperclip size={20} color="#FFFFFF" />
          ) : (
            <Check size={20} color="#6cff27" />
          )}

          <span className="font-semibold text-white text-lg">Anexo</span>
        </button>
        {imageError && (
          <p className="text-red-500 text-sm mt-1">{imageError}</p>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {ring ? (
            <Save className="w-5 h-5" />
          ) : (
            <PlusCircle className="w-5 h-5" />
          )}
          {ring ? "Atualizar" : "Criar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
