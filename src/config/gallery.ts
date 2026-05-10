/**
 * Gallery images — auto-discovered from src/assets/photoshoot/
 *
 * To add new photos, place them in the appropriate subfolder
 * under src/assets/photoshoot/ and they will appear automatically.
 */

export type GalleryImage = {
  src: string;
  alt: string;
};

const modules = import.meta.glob<{ default: string }>(
  "@/assets/photoshoot/**/*.jpg",
  { eager: true }
);

export const galleryImages: GalleryImage[] = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, mod]) => {
    const filename = path.split("/").pop() ?? "";
    const alt = filename
      .replace(/\.jpg$/i, "")
      .replace(/-\d{2}$/, "")
      .replace(/-/g, " ")
      .trim();
    return { src: mod.default, alt };
  });
