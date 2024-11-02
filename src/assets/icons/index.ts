const _icons = import.meta.glob('./*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export type IconName = 'palette' | 'setting' | 'models' | 'info' | 'lumos';

export type Icons = {
  [key in IconName]: string;
};

export const icons = Object.keys(_icons).reduce((pre, cur) => {
  pre[cur.slice(2, -4) as keyof Icons] = _icons[cur] as string;
  return pre;
}, {} as Icons);
