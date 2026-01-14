import { ref, uploadBytes, getDownloadURL, deleteObject, StorageReference } from 'firebase/storage';
import { storage } from './firebase';

/**
 * Upload un fichier vers Firebase Storage
 * @param file - Le fichier à uploader
 * @param path - Le chemin où stocker le fichier (ex: 'properties/photo1.jpg')
 * @returns L'URL publique du fichier uploadé
 */
export async function uploadFile(file: File, path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error: any) {
    console.error('Erreur lors de l\'upload du fichier:', error);
    throw error;
  }
}

/**
 * Upload plusieurs fichiers vers Firebase Storage
 * @param files - Les fichiers à uploader
 * @param basePath - Le chemin de base où stocker les fichiers (ex: 'properties')
 * @returns Un tableau des URLs publiques des fichiers uploadés
 */
export async function uploadMultipleFiles(files: File[], basePath: string): Promise<string[]> {
  try {
    const uploadPromises = files.map((file, index) => {
      const fileName = `${Date.now()}_${index}_${file.name}`;
      const path = `${basePath}/${fileName}`;
      return uploadFile(file, path);
    });
    
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error: any) {
    console.error('Erreur lors de l\'upload des fichiers:', error);
    throw error;
  }
}

/**
 * Supprime un fichier de Firebase Storage
 * @param path - Le chemin du fichier à supprimer
 */
export async function deleteFile(path: string): Promise<void> {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error: any) {
    console.error('Erreur lors de la suppression du fichier:', error);
    throw error;
  }
}

/**
 * Supprime plusieurs fichiers de Firebase Storage
 * @param paths - Les chemins des fichiers à supprimer
 */
export async function deleteMultipleFiles(paths: string[]): Promise<void> {
  try {
    const deletePromises = paths.map(path => deleteFile(path));
    await Promise.all(deletePromises);
  } catch (error: any) {
    console.error('Erreur lors de la suppression des fichiers:', error);
    throw error;
  }
}
