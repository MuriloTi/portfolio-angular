import enUS from './en-US.json';
import ptBR from './pt-BR.json';

type Tree = Record<string, unknown>;

function flatten(tree: Tree, prefix = ''): Record<string, unknown> {
  return Object.entries(tree).reduce<Record<string, unknown>>((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(acc, flatten(value as Tree, path));
    } else {
      acc[path] = value;
    }
    return acc;
  }, {});
}

describe('translation files', () => {
  const pt = flatten(ptBR);
  const en = flatten(enUS);

  it('pt-BR and en-US have exactly the same keys', () => {
    expect(Object.keys(pt).sort()).toEqual(Object.keys(en).sort());
  });

  it('every value is a non-empty string', () => {
    for (const [key, value] of Object.entries({ ...pt, ...en })) {
      expect(typeof value, key).toBe('string');
      expect((value as string).trim().length, key).toBeGreaterThan(0);
    }
  });

  it('uses the same interpolation params in both languages', () => {
    const params = (s: unknown) => (String(s).match(/{{\s*\w+\s*}}/g) ?? []).sort();
    for (const key of Object.keys(pt)) {
      expect(params(en[key]), key).toEqual(params(pt[key]));
    }
  });
});
