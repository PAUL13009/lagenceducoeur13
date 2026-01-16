export function generateSlug(data: {
  type: string;
  property_type: string;
  city: string;
  district: string;
  rooms: number;
  area: number;
}): string {
  const operation = data.type === 'acheter' ? 'vente' : 'location';
  
  const propertyTypeMap: { [key: string]: string } = {
    'appartement': 'appartement',
    'maison': 'maison',
    'loft': 'loft',
  };
  
  const propertyType = propertyTypeMap[data.property_type] || data.property_type;
  
  const normalizeCity = (str: string): string => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };
  
  const normalizeDistrict = (str: string): string => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/eme$/, 'eme')
      .replace(/ème$/, 'eme')
      .replace(/er$/, 'er')
      .replace(/ère$/, 'er');
  };
  
  const city = normalizeCity(data.city);
  const district = normalizeDistrict(data.district);
  const typeRoom = `t${data.rooms}`;
  const surface = `${data.area}m2`;
  
  const parts = [
    operation,
    propertyType,
    city,
    district,
    typeRoom,
    surface,
  ].filter(Boolean);
  
  return parts.join('-');
}

export function extractIdFromSlug(slugWithId: string): string {
  if (!slugWithId) {
    return '';
  }
  
  const parts = slugWithId.split('-');
  const lastPart = parts[parts.length - 1];
  
  if (lastPart && lastPart.length >= 20) {
    return lastPart;
  }
  
  if (slugWithId.length >= 20 && parts.length === 1) {
    return slugWithId;
  }
  
  return slugWithId;
}

export function buildPropertyUrl(slug: string | undefined, id: string): string {
  if (slug) {
    return `/biens/${slug}-${id}`;
  }
  return `/biens/${id}`;
}
