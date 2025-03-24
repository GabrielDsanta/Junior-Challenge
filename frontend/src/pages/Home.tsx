import Toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Gem, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Ring, RingCreateSchema } from "../types/ring";
import { useRing } from "../hooks/useRing";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../services/firebase";
import { RingCarousel, RingForm, RingGrid, Header } from "../components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function Home() {
  const { createRing, getRings, deleteRing, updateRing } = useRing();
  const { data, isLoading, refetch } = getRings;

  const [selectedRing, setSelectedRing] = useState<Ring | undefined>();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (ringData: Omit<Ring, "id">) => {
    if (selectedRing) {
      await handleUpdateRing(ringData, selectedRing.id);
    } else {
      await handleCreateRing(ringData);
    }
    handleCancel();
  };

  const handleSelectToEdit = (ring: Ring) => {
    setSelectedRing(ring);
    setIsFormVisible(true);
  };

  const handleDelete = async (ringId: string) => {
    try {
      const { success } = await deleteRing.mutateAsync({
        ringId,
      });

      if (success) {
        await refetch();
        Toast.success("Anel deletado com sucesso!");
      }
    } catch (error) {
      Toast.error("Erro ao tentar deletar o anel.");
    }
  };

  const handleCancel = () => {
    setSelectedRing(undefined);
    setIsFormVisible(false);
  };

  const handleCreateRing = async (ring: RingCreateSchema) => {
    if (!image) return;

    setIsUploading(true);
    const storageRef = ref(storage, `exotiq/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.log(error);
        setIsUploading(false);
        Toast.error("Erro ao fazer upload da imagem.");
      },
      async () => {
        try {
          const documentUri = await getDownloadURL(uploadTask.snapshot.ref);

          const body = {
            ...ring,
            imageUri: documentUri,
          };

          if (documentUri) {
            const { success, error } = await createRing.mutateAsync({
              ring: body,
            });

            if (success) {
              await refetch();
              Toast.success("Anel criado com sucesso!");
            } else {
              Toast.error(error);
            }
          }
        } catch (error) {
          Toast.error("Erro ao tentar criar o anel.");
        } finally {
          setIsUploading(false);
          setImage(null);
        }
      }
    );
  };

  const handleUpdateRing = async (ring: RingCreateSchema, ringId: string) => {
    try {
      if (image) {
        setIsUploading(true);
        const storageRef = ref(storage, `exotiq/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        const documentUri = await new Promise<string>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            () => {},
            (error) => {
              reject(error);
            },
            async () => {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(url);
            }
          );
        });

        ring = { ...ring, imageUri: documentUri };
      }

      const { success } = await updateRing.mutateAsync({
        ring,
        ringId,
      });

      if (success) {
        await refetch();
        Toast.success("Anel editado com sucesso!");
      }
    } catch (error) {
      Toast.error("Erro ao tentar editar o anel.");
    } finally {
      setIsUploading(false);
      setImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-center" />

      {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-2" />
            <p className="text-gray-700">Enviando imagem...</p>
          </div>
        </div>
      )}

      <Header isLoading={isLoading} setIsFormVisible={setIsFormVisible} />

      {!isFormVisible && !isLoading && data && data.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[1280px] flex mx-auto my-10"
        >
          <RingCarousel rings={data!} />
        </motion.section>
      )}

      {isLoading && (
        <div className="w-full flex items-center justify-center mt-[15%]">
          <div
            className="w-8 h-8 border-2 border-solid rounded-full animate-spin mt-5"
            style={{ borderTopColor: "#163172" }}
          ></div>
        </div>
      )}

      <main className="max-w-7xl mx-auto py-8">
        {isFormVisible && (
          <RingForm
            image={image}
            setImage={setImage}
            ring={selectedRing}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}

        {!isLoading && data && data.length > 0 && !isFormVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <RingGrid
              rings={data!}
              onEdit={handleSelectToEdit}
              onDelete={handleDelete}
            />
          </motion.div>
        )}
      </main>

      {data && data.length === 0 && !isLoading && (
        <div className="items-center gap-2 w-full flex justify-center mt-[15%]">
          <Gem color="#4f46e5" className="w-8 h-8" />
          <h1 className="text-2xl font-semibold text-[#404040]">
            Você não possui nenhum anel.
          </h1>
        </div>
      )}
    </div>
  );
}
