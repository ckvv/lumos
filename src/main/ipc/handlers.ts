function chat(data: any) {
  console.log('ddddd', data);
  return data;
}

export const handlers = {
  chat,
} as Record<string, any>;
