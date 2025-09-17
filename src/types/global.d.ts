export {};

declare global {
  interface Window {
    propertyImages?: Array<{ src: string; alt?: string }>;
  }
}

