export function buildPayload<T extends Record<string, any>>(values: T, initialData?: Partial<T>): Partial<T> {
  const payload: Partial<T> = {};
  const socialKeys = ["instagram", "facebook", "linkedin", "x", "whatsapp"];
  const socialMedia: Record<string, string | null> = {};

  function normalize(val: any) {
    return val === "" || val === undefined ? null : val;
  }

  function processField(key: string, value: any, initialValue: any, target: any) {
    const normalizedValue = normalize(value);

    // image fields (array -> string)
    if ((key.toLowerCase().includes("image") || key === "image") && Array.isArray(value)) {
      const newImage = value[0] || null;
      if (newImage !== initialValue) target[key] = newImage;
    }
    // array fields (faq, testimonials, lectures etc.)
    else if (Array.isArray(value)) {
      const newArr = value.map((item) => (typeof item === "object" && item !== null ? buildPayload(item, initialValue) : item));
      if (JSON.stringify(newArr) !== JSON.stringify(initialValue)) target[key] = newArr;
    }
    // social media keys
    else if (socialKeys.includes(key)) {
      socialMedia[key] = normalizedValue as string | null;
    }
    // normal fields
    else {
      if (normalizedValue !== initialValue) target[key] = normalizedValue;
    }
  }

  Object.entries(values).forEach(([key, value]) => {
    const initialValue = initialData?.[key as keyof T];
    processField(key, value, initialValue, payload);
  });

  if (Object.values(socialMedia).some((val) => val !== null)) {
    (payload as any).socialMedia = socialMedia;
  }

  return payload;
}
